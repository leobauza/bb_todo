// Filename: models/todo

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodoView = require('views/todos/todo')
		// , CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
	;


	return Backbone.Model.extend({
		urlRoot: '/api/todos', //remember this is URL ROOT not URL
		defaults: {
			'description' : 'empty to do..',
			'status' : 'incomplete'
		},
		toggleStatus: function(){
			var $status = this.get('status');
			($status == 'incomplete') ? this.set({'status':'complete'}) : this.set({'status':'incomplete'});
			this.save();
		}
	});
});
