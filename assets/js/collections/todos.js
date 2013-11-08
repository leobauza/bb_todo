// Filename: collections/todos
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'models/todo'
], function($, migrate, ui, _, Mustache, Backbone, TodoModel){
	var TodosCollection = Backbone.Collection.extend({
		// initialize: function(models, options) {
		// 	console.log("init " + options.id);
		// 	this.url = '/api/categories/' + options.id;
		// },
		// mod: function(models, options) {
		// 	this.url = '/api/categories/' + options.id;
		// 	console.log("mod " + options.id);
		// },
		model: TodoModel,
		comparator: 'todo_order',
		
		initialize: function(models, options) {
			this.category = options.category;
		},
		url: function() {
			return this.category.url() + '/todos'
		}
	
	});
	return TodosCollection;
});
