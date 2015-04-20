var baseController = require('./base');
var View = require('../views/base');

module.exports = baseController.extend({
    name: "Blog",
    content: null,
    run: function(req, res, next){
        var v = new View(res, 'blog');
        v.render('');
    },
    getContent: function(callback){

    }
});