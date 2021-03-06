/**
 * Created by Collins on 4/22/2015.
 */

var baseController = require('./base');
var View = require('../views/base');
var model = new (require('../models/contentModel'));
var fs = require('fs');
var crypto = require('crypto');

module.exports = baseController.extend({
    name: "Admin",
    run: function(req, res, next) {
        var self = this;
        model.setDB(req.db);
        var v = new View(res, 'admin');
        self.form(req, res, function() {
            v.render({
                title: "添加一条新博客"
            });
        })
    },
    form: function(req, res, callback) {
        if (req.body && req.body.formsubmitted && req.body.formsubmitted === 'yes') {
            var data = {
                title: req.body.title,
                text: req.body.text,
                picture: this.handleFileUpload(req),
                ID: req.body.ID
            };
            model[!req.body.ID ? 'insert' : 'update'](data, function (err, objects) {
                callback();
            });
        } else {
            callback();
        }
    },
    handleFileUpload: function(req) {
        if (!req.files || !req.files.picture || !req.files.picture.name) {
            return req.body.currentPicture || {};
        }

        var data = fs.readFileSync(req.files.picture.path);
        var filename = req.files.picture.name;
        var uid = crypto.randomBytes(10).toString('hex');
        var dir = __dirname + "/../public/uploads/" + uid;
        fs.mkdirSync(dir, '0777');
        fs.writeFileSync(dir + "/" + filename, data);
        return '/uploads/' + uid + "/" + filename;
    }
});

