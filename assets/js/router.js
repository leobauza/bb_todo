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
	'views/categories/category',
	'views/categories/categories',
	'collections/categories'
], function($, migrate, ui, _, Mustache, Backbone, TodoView, TodosView, FormView, TodosCollection, CategoryView, CategoriesView, CategoriesCollection){
	var TodoRouter = Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"form/:id" : "form",
			"category/:id" : "category"
		},
		initialize: function(bootstrap){
			console.log(bootstrap); //bootstraps my todos list and my categories list (todos list has to change to be based on category)

			//bootstrap and fetch the TODOS
			// this.todos = new TodosCollection(bootstrap.todos); //bootstrap defined at the top in a script tag
			// this.todosView = new TodosView({
			// 	collection:this.todos
			// });
			// this.todosView.render();
			//this.fetchingTodos = this.todos.fetch({silent:true}); //silently fetch after render??

			//bootstrap and fetch the CATEGORIES (on the sidebar)
			this.categories = new CategoriesCollection(bootstrap.categories);
			this.categoriesView = new CategoriesView({
				collection:this.categories
			});
			console.log(this.categories.models);
			this.categoriesView.render();
			//this.fetchingCats = this.categories.fetch({silent:true}); //silently fetch after render??
		
		
		}
	});
	
	var todoRouter = new TodoRouter(bootstrap);


	//home
	todoRouter.on('route:home', function(){
		var that = this;
		//after fetching call render (on the collection view)
		this.fetchingTodos.done(function(){
			that.todosView.render();
		});
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
		console.log('catttt')
		var todos = new TodosCollection([], {id : id}); //bootstrap defined at the top in a script tag
		todos.fetch({
			success: function(results) {
				var todosView = new TodosView({
					collection: todos
				});
				todosView.render();
				//console.log(todos.models);
				
				//todosView.render();
			}
		});
		console.log('category: ' + id);

	});
	
	//form
	todoRouter.on('route:form', function(id){
		var that = this;
		this.fetchingTodos.done(function(){
			//considering doing this through todosView so that it can populate the 
			//main list area on landing...
			that.todos.where({'id':id}).forEach(function(model){
				//console.log(model);
				var formView = new FormView({
					model:model,
					stuff:"my stuff"
				});
				formView.render();
			});
		});

	});

	var initialize = function(){
		console.log('backbone history start!');
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