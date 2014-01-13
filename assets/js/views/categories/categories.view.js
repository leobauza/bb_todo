// Filename: views/todos/todos.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, CategoryView = require('views/categories/category.view')
	;


	return Backbone.View.extend({
		el: 'ul.category-list',
		initialize: function(){
			var that = this;
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
			$(categoryView.el).droppable({
				accept: ".todo-list .movable"
			}); // make each one droppable


		},
		removeItemViews: function(){
			this.trigger('clean_up');
		}
	});
});