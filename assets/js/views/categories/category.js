// Filename: views/todos/todo
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'text!templates/catListItem.html'
], function($, migrate, ui, _, Mustache, Backbone, catListItemTpl){

	var CategoryView = Backbone.View.extend({
		template: Mustache.compile(catListItemTpl),
		initialize: function(){
			
		},
		render: function(){
			this.setElement(this.template(this.model.attributes));
		}
	});
	//Our module now returns our view
	return CategoryView;
});
	
	
	
	
