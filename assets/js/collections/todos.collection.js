// Filename: collections/todos.collection

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, TodoModel = require('models/todo.model')
	;

	return Backbone.Collection.extend({
		model: TodoModel,
		comparator: 'todo_order',
		
		initialize: function(models, options) {
			this.category = options.category;
		},
		url: function() {
			return this.category.url() + '/todos'
		}
	});

});
