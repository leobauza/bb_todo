// Filename: models/category.model

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, TodosCollection = require('collections/todos.collection')
		, TodosView = require('views/todos/todos.view')
	;

	return Backbone.Model.extend({
		urlRoot: '/api/categories', //remember this is URL ROOT not URL
		defaults: {
			'name' : 'category default'
		},
		initialize: function() {
			//so I create a collection and a view...and then the getTodos function populates it.
			this.todos = new TodosCollection([], { category: this });
			this.todosView = new TodosView({ collection: this.todos, catId: this.id });
		},
		getTodos: function() {
			var that = this;
			this.todos.fetch({
				success: function(results) {
					//console.log(that.todos.pluck('description'));
					$('.page ul').empty(); //is this ok because I am recreating the other collection views anyways so they aren't becoming zombies?????
					
					that.todosView.render();
				},
				error: function() {
					console.log('error');
				}
			});
		}


	});

});
