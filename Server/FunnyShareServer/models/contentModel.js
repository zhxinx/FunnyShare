var baseModel = require('./base');
var model = new baseModel();
var crypto = require('crypto');

var contentModel = model.extend({
    insert: function(data, callback){
        data.ID = crypto.randomBytes(20).toString('hex');
        this.collection().insert(data, {}, callback || function(){});
    },
    update: function(data, callback){
        this.collection().update({ID: data.ID}, data, {}, callback || function(){});
    },
    // Different argument list for getList/remove
    getList: function(callback, query){
        this.collection().find(query || {}).toArray(callback);
    },
    remove: function(ID, callback){

    }
});

module.exports = contentModel;
