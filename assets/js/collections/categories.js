// Filename: collections/categories

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, CategoryModel = require('models/category')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodoView = require('views/todos/todo')
		// , CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
	;

	return Backbone.Collection.extend({
		url: '/api/categories',
		model: CategoryModel
	});

});
