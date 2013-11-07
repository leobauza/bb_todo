// Filename: collections/todos
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'models/category'
], function($, migrate, ui, _, Mustache, Backbone, CategoryModel){
	var CategoriesCollection = Backbone.Collection.extend({
		url: '/api/todos',
		model: CategoryModel
	});
	return CategoriesCollection;
});
