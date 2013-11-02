// Filename: views/todos/todo
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'text!templates/listItem.html'
], function($, migrate, ui, _, Mustache, Backbone, listItemTpl){

	var TodoView = Backbone.View.extend({
		//tagName: 'li',
		template: Mustache.compile(listItemTpl),
		initialize: function(){
			
		},
		render: function(){
		
			(this.model.attributes.status == "incomplete")? switcher = {checkbox: false} : switcher = {checkbox:true};
			var tplObj = _.extend(switcher, this.model.attributes); //order matters...attrs first would modify the attrs and we dont want that...
			
			this.setElement(this.template(tplObj));
		
		},
		toggleStatus: function(){
			this.model.toggleStatus();
			if(this.options.stuff == "my stuff") {
				console.log("yes stuff")
				this.$el.removeClass('incomplete').toggleClass('complete');
			} else {
				console.log("no stuff");
			}
		},
		drop: function(event, index) {
			//console.log(this.model);
			this.$el.trigger('update-sort', [this.model, index]);
		},
		events: {
			'click input[type=checkbox]' : 'toggleStatus',
			'drop' : 'drop'
		}
	});
	//Our module now returns our view
	return TodoView;
});
	
	
	
	
	