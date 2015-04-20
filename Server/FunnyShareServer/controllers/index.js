var baseController = require('./base');
var View = require('../views/base');

module.exports = baseController.extend({
  name: "Home",
  content: null,
  run: function(req, res, next){
    var v = new View(res, 'index');
    v.render('');
  },
  getContent: function(callback){

  }
});