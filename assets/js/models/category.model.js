// Filename: models/category.model

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, TodosFiltered = require('collections/todosFiltered.collection')
		, TodosView = require('views/todos/todos.view')
	;

	return Backbone.Model.extend({
		urlRoot: '/api/categories', //remember this is URL ROOT not URL
		defaults: {
			'name' : 'category default'
		},
		initialize: function() {
			//so I create a collection and a view...and then the getTodos method populates it.
			this.todos = new TodosFiltered([], { category: this });
			this.todosView = new TodosView({ collection: this.todos, catId: this.id });
			this.listenTo(this.todosView, 'test', function(model) { console.log("category listening: ", model) });
		},
		getTodos: function() {
			var that = this;
			this.todos.fetch({
				success: function(results) {
					$('.page ul').remove();
					that.todosView.render();
				},
				error: function() {
					console.log('error');
				}
			});
		}
	});
});
