// Filename: models/todo
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone'
], function($, migrate, ui, _, Mustache, Backbone){
	var CategoryModel = Backbone.Model.extend({
		urlRoot: '/api/todos', //remember this is URL ROOT not URL
		defaults: {
			'name' : 'category default'
		}
	});
	//Return the model for the module
	return CategoryModel
});
