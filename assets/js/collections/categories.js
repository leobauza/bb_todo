// Filename: collections/categories
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
		url: '/api/categories',
		model: CategoryModel
	});
	return CategoriesCollection;
});
