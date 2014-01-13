// Filename: views/todos/form.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		,formTpl = require('text!templates/addform.html')
	;

	return Backbone.View.extend({
		template: Mustache.compile(formTpl),
		initialize: function(options){
			this.category_id = options.category_id;
			this.todo_order = options.todo_order;
		},
		render: function(options){
			this.setElement(this.template({ category_id : this.category_id, todo_order : this.todo_order }));
			return this;
		},
		save: function(e) {
			e.preventDefault();
			var that = this;
			
			var todoDetails = this.$el.serializeObject();
			this.model.save(todoDetails, {
				success: function(model, response, options) {
					that.trigger('saved', model);
				},
				error: function(model, xhr, options) {
					console.warn("error");
				}
			});
		},
		events: {
			submit: "save",
		}
	});
});
