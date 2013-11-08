// Filename: models/category
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'collections/todos',
	'views/todos/todos',
	'views/todos/form'
], function($, migrate, ui, _, Mustache, Backbone, TodosCollection, TodosView, FormView){
	var CategoryModel = Backbone.Model.extend({
		urlRoot: '/api/categories', //remember this is URL ROOT not URL
		defaults: {
			'name' : 'category default'
		},
		initialize: function() {
			//so I create a collection and a view...and then the getTodos function populates it.
			this.todos = new TodosCollection([], {category: this});
			this.todosView = new TodosView({collection: this.todos});
		},
		getTodos: function() {
			var that = this;
			this.todos.fetch({
				success: function(results) {
					console.log(that.todos.pluck('description'));
					$('.page ul').empty(); //is this ok because I am recreating the other collection views anyways so they aren't becoming zombies?????
					
					that.todosView.render();
				},
				error: function() {
					console.log('error');
				}
			});
		}


	});
	//Return the model for the module
	return CategoryModel
});
