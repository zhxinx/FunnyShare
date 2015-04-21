var baseModel = require('./base');
var model = new baseModel();

var contentModel = model.extend({
    insert: function(data, callback){

    },
    update: function(data, callback){

    },
    // Different argument list for getList/remove
    getList: function(callback, query){
        this.collection().find(query || {}).toArray(callback);
    },
    remove: function(ID, callback){

    }
});

module.exports = contentModel;
