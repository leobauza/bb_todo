// Filename: views/todos/todos

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		// , catListItemTpl = require('text!templates/catListItem.html')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		// , FormView = require('views/todos/form')
		// , TodoView = require('views/todos/todo')
		, CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
	;


	return Backbone.View.extend({
		el: 'ul.category-list',
		initialize: function(){
			this.listenTo(this.collection, 'change', this.render);
		},
		render: function(){
			this.removeItemViews(); 
			this.collection.forEach(this.addOne, this);
		},
		renderOne: function(id){
			this.removeItemViews(); 
			this.collection.where({'id':id}).forEach(this.addOne, this);
		},
		addOne: function(category){
			var categoryView = new CategoryView({model: category});
					
			categoryView.listenTo(this, 'clean_up', categoryView.remove); //have this todoView listen to clean_up!
			categoryView.render();
			this.$el.append(categoryView.el);
		},
		removeItemViews: function(){
			this.trigger('clean_up');
		}
	});
});