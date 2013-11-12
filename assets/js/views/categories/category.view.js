// Filename: views/categories/category.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, catListItemTpl = require('text!templates/catListItem.html')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodoView = require('views/todos/todo')
		// , CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
	;

	return Backbone.View.extend({
		template: Mustache.compile(catListItemTpl),
		initialize: function() {
			
		},
		render: function() {
			this.setElement(this.template(this.model.attributes));
		}
	});
});
	
	
	
	
