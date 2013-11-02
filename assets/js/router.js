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
	'collections/todos'
], function($, migrate, ui, _, Mustache, Backbone, TodoView, TodosView, FormView, TodosCollection){
	var TodoRouter = Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"form/:id" : "form"
		},
		initialize: function(bootstrap){
			console.log(bootstrap.todos);
			console.log("bootstrapping models from the server!")
			this.todos = new TodosCollection(bootstrap.todos); //bootstrap defined at the top in a script tag
			this.todosView = new TodosView({
				collection:this.todos
			});
			console.log(this.todos.models);
			this.todosView.render();
			this.fetching = this.todos.fetch({silent:true}); //silently fetch after render??
		}
	});
	
	var todoRouter = new TodoRouter(bootstrap);

	//home
	todoRouter.on('route:home', function(){
		var that = this;
		//after fetching call render (on the collection view)
		this.fetching.done(function(){
			that.todosView.render();
		});

	});
	//single
	todoRouter.on('route:single', function(id){
		var that = this;
		//after fetching call render one (on the collection view) and pass the id
		this.fetching.done(function(){
			that.todosView.renderOne(id);
		});


	});
	//form
	todoRouter.on('route:form', function(id){
		var that = this;
		this.fetching.done(function(){
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
			// console.log(e.target.pathname);
			// console.log($(e.currentTarget).attr('href'))
			todoRouter.navigate(e.target.pathname, true);
			e.preventDefault();
		});

		//Bootstrap data on app load... need a way to do this with php
		bootstrap = {
			todos: [{"id":"0","description":"this is an item with index 0 and a very long description that needs to be longer to go to a second line.","status":"incomplete","ordinal":"0"},{"id":"1","description":"test auto saving mechanism. Again.","status":"incomplete","ordinal":"1"},{"id":"2","description":"auto save test","status":"incomplete","ordinal":"2"},{"id":"3","description":"testing three","status":"incomplete","ordinal":"4"},{"id":"4","description":"id is four","status":"incomplete","ordinal":"5"},{"id":"5","description":"index 5","status":"incomplete","ordinal":"3"}]
		}
	};
	
	return {
		initialize: initialize
	};
});