// Filename: router.js

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		// , TodoView = require('views/todos/todo')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodosCollection = require('collections/todos')
		// , CategoryView = require('views/categories/category')
		, CategoriesView = require('views/categories/categories')
		, CategoriesCollection = require('collections/categories')
	;

	return Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"form/:id" : "form",
			"category/:id" : "category"
		},
		initialize: function(bootstrap){

			//CATEGORIES
			this.categories = new CategoriesCollection(bootstrap.categories);
			this.categoriesView = new CategoriesView({
				collection:this.categories
			});
			this.categoriesView.render();
		
			//this.categories.fetch();
		
		}, 
		category: function(id) {
			var $cat = this.categories.get(id);
			$cat.getTodos();
		}
	});
	
	//var todoRouter = new TodoRouter(bootstrap);


	//home
	todoRouter.on('route:home', function(){});
	
	//single
	todoRouter.on('route:single', function(id){});
	
	//single
	todoRouter.on('route:category', function(id){
		var $cat = this.categories.get(id);
		$cat.getTodos();
	});
	
	//form
	todoRouter.on('route:form', function(id){});

	// var initialize = function(){
	// 
	// };
	
	// return {
	// 	initialize: initialize
	// };
});