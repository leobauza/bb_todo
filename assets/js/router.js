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
			"form/:id" : "form",
			"category/:id(/)" : "category"
		},
		initialize: function(bootstrap){
			//Master todos collection
			this.todos = new Todos();
			this.todosView = new TodosView({ collection: this.todos });


			//CATEGORIES
			this.categories = new CategoriesCollection(bootstrap.categories);
			this.categoriesView = new CategoriesView({
				collection:this.categories
			});
			this.categoriesView.render();

			//this.categories.fetch();
		
		},
		category: function(id) {
			$('.form').empty(); //clear because you are going to a new collection
			
			var $cat = this.categories.get(id);
			$cat.getTodos();
		},
		home: function() {
			var that = this;
			this.todos.fetch({
				success: function(results) {
					//console.log(that.todos.pluck('description'));
					//$('.page ul').empty(); //is this ok because I am recreating the other collection views anyways so they aren't becoming zombies?????
					$('.page ul').remove();
					
					that.todosView.renderFront();
					
				},
				error: function() {
					console.log('error');
				}
			});
		},
		single: function(id) {
			
		}, 
		form: function() {
			
		}
	});
	
});