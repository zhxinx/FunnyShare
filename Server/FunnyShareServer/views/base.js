module.exports = function(response, template){
    this.response = response;
    this.template = template;
};

module.exports.prototype = {
    render: function(data){
        if (this.response, this.template){
            // res.render(view [, locals] [, callback])
            // Renders a view and sends the rendered HTML string to the client. Optional parameters:
            this.response.render(this.template, data);
        }
    }
};