// Filename: views/todos/todo.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, listItemTpl = require('text!templates/listItem.html')
		, FormView = require('views/todos/form.view')
	;

	return Backbone.View.extend({
		//tagName: 'li',
		template: Mustache.compile(listItemTpl),
		initialize: function(options){

			//listeners
			this.listenTo(this.model, 'change', this.statusUpdate);

			//options
			this.catId = options.catId;
			
			//views
			this.formView = new FormView({ model: this.model });
		},
		render: function() {
			var switcher;
			
			this.model.set({category_id: this.catId}); //add category ID to model
			(this.model.attributes.status == "incomplete")? switcher = {checkbox: false} : switcher = {checkbox:true};
			var tplObj = _.extend(switcher, this.model.attributes); //order matters...attrs first would modify the attrs and we dont want that...
			this.setElement(this.template(tplObj));
			
			console.log("log attributes: ", this.model.attributes)
		
		},
		statusUpdate: function() {
			//and if there is content to update...
			//this is because I am setting the element to the template output so updating it is trickier...
			var switcher;
			var catId = {catId: this.catId};
			(this.model.attributes.status == "incomplete")? switcher = {checkbox: false} : switcher = {checkbox:true};
			var tplObj = _.extend(switcher, this.model.attributes, catId); //order matters...attrs first would modify the attrs and we dont want that...

			this.$el.toggleClass('complete', switcher.checkbox); //much lower resource intensive than rerendering the whole collection
			this.$el.html($(this.template(tplObj)).html());

		},
		toggleStatus: function() {
			this.model.toggleStatus();
		},
		drop: function(event, index) {
			this.$el.trigger('update-sort', [this.model, index]);
		},
		edit: function() {
			//console.log('label', this.model);
			//var formView = new FormView({model: this.model, catId: this.catId});
			
			this.formView.render();
			
			//$('.form').html(this.formView.render().el);
			
		},
		events: {
			'click input[type=checkbox]' : 'toggleStatus',
			'drop' : 'drop',
			'click .form-btn' : 'edit'
		}
	});

});
	
	
	
	
	