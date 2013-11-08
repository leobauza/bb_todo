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
	var AllTodosCollection = Backbone.Collection.extend({
		model: TodoModel,
		url: '/api/todos'
	});
	return AllTodosCollection;
});
