// Filename: router.js
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'views/todos/todo',
	'views/todos/todos',
	'views/todos/form',
	'collections/todos',
	'collections/allTodos',
	'views/categories/category',
	'views/categories/categories',
	'collections/categories'
], function($, migrate, ui, _, Mustache, Backbone, TodoView, TodosView, FormView, TodosCollection, AllTodosCollection, CategoryView, CategoriesView, CategoriesCollection){
	var TodoRouter = Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"form/:id" : "form",
			"category/:id" : "category"
		},
		initialize: function(bootstrap){

			// //keep this bad boy in the background for editing models
			// this.alltodos = new AllTodosCollection();
			// this.fetchTodos = this.alltodos.fetch({
			// 	success: function(models){
			// 		console.log(models)
			// 	}
			// });
			// //collection view to use for single todo view and single form view
			// this.allTodosView = new TodosView({
			// 	collection:this.alltodos
			// });


			//CATEGORIES
			this.categories = new CategoriesCollection(bootstrap.categories);
			this.categoriesView = new CategoriesView({
				collection:this.categories
			});
			this.categoriesView.render();
		
			//this.categories.fetch();
		
		}
	});
	
	var todoRouter = new TodoRouter(bootstrap);


	//home
	todoRouter.on('route:home', function(){
		// var that = this;
		// that.todosView.render();
	});
	
	//single
	todoRouter.on('route:single', function(id){
		var that = this;
		//after fetching call render one (on the collection view) and pass the id
		this.fetchingTodos.done(function(){
			that.todosView.renderOne(id);
		});
	});
	
	//single
	todoRouter.on('route:category', function(id){
		var $cat = this.categories.get(id);
		$cat.getTodos();
	});
	
	//form
	todoRouter.on('route:form', function(id){

		


		// var that = this;
		// this.fetchTodos.done(function(){
		// 	that.allTodosView.renderForm(id);
		// });

	});

	var initialize = function(){
		Backbone.history.start({
			pushState: true,
			silent:true //pass silent true to not trigger the home route on load so you can bootstrap data?
		});

		$('body').on('click', 'a[href^="/"]' ,function(e){
			e.preventDefault();
			// console.log(e.target.pathname);
			// console.log($(e.currentTarget).attr('href'))
			todoRouter.navigate(e.target.pathname, true);

		});
	};
	
	return {
		initialize: initialize
	};
});