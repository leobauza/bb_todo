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
		//url: '/api/categories' + this.options.catId,
		//comparator: 'ordinal'
		initialize: function(models, options) {
			this.url = '/api/categories/' + options.id;
		},
		
		model: TodoModel,
	
	});
	return TodosCollection;
});
