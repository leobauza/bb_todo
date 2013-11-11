// Filename: collections/todos

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, TodoModel = require('models/todo')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodoView = require('views/todos/todo')
		// , CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
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
