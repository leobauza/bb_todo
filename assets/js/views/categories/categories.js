// Filename: views/todos/todos
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'views/categories/category'
], function($, migrate, ui, _, Mustache, Backbone, CategoryView){
	var CategoriesView = Backbone.View.extend({
		el: 'ul.category-list',
		initialize: function(){
			this.listenTo(this.collection, 'change', this.render);
		},
		render: function(){
			console.log('render all');
			this.removeItemViews(); 
			this.collection.forEach(this.addOne, this);
		},
		renderOne: function(id){
			console.log('render one');
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
	return CategoriesView;
});