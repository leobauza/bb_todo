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
			console.log("init " + options.id);
			this.url = '/api/categories/' + options.id;
		},
		mod: function(models, options) {
			this.url = '/api/categories/' + options.id;
			console.log("mod " + options.id);
		},
		model: TodoModel,
	
	});
	return TodosCollection;
});
