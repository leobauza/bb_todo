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
		url: '/api/todos',
		model: TodoModel,
		comparator: 'ordinal'
	});
	return TodosCollection;
});
