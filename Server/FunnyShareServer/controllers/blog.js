var baseController = require('./base');
var View = require('../views/base');
var model = new (require('../models/contentModel'));

module.exports = baseController.extend({
    name: "Blog",
    content: null,
    run: function(req, res, next){
        model.setDB(req.db);
        var self = this;
        this.getContent(function(){
            var v = new View(res, 'blog');
            v.render(self.content);
        });
    },
    getContent: function(callback){
        var self = this;
        this.content = {};
        model.getList(function(err, records){
            var blogArticles = '';
            if (records.length > 0) {
                for (var i = 0; i < records.length; i++){
                    var record = records[i];
                    blogArticles += '\
                        <section class="item">\
                            <h2>' + record.title + '</h2>\
                            <p>' + record.text + '</p>';

                    if (record.picture.length){
                        blogArticles +=  ' <img src="' + record.picture + '" alt="" />';
                    }

                    blogArticles += ' \
                            <br class="clear" />\
                            <hr />\
                        </section>\
                        ';
                }
            }
            self.content.blogArticles = blogArticles;
            callback();
        }, { /*type: 'blog' */});
    }
});