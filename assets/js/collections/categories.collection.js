// Filename: collections/categories.collection

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, CategoryModel = require('models/category.model')
	;

	return Backbone.Collection.extend({
		url: '/api/categories',
		model: CategoryModel
	});

});
