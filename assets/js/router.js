// Filename: router.js

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, CategoriesView = require('views/categories/categories.view')
		, CategoriesCollection = require('collections/categories.collection')
		, Todos = require('collections/todos.collection')
		, TodosView = require('views/todos/todos.view')
	;

	return Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"category/:id(/)" : "category"
		},
		initialize: function(bootstrap){
			//Master todos collection and view
			this.todos = new Todos(bootstrap.todos);
			this.todosView = new TodosView({ collection: this.todos });
			this.todosView.renderFront();

			//CATEGORIES
			this.categories = new CategoriesCollection(bootstrap.categories);
			this.categoriesView = new CategoriesView({ collection:this.categories });
			this.categoriesView.render();
		},
		category: function(id) {
			$('.form').empty(); //clear because you are going to a new collection
			
			var $cat = this.categories.get(id);
			$cat.getTodos();
		},
		home: function() {
			var that = this;
			this.todos.fetch({
				data : { something : 1 },
				success: function(results) {
					$('.page ul').remove();
					that.todosView.renderFront();
				},
				error: function() {
					console.log('error');
				}
			});
		},
		single: function(id) {
			
		}
	});
	
});