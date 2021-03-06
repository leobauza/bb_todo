// Filename: views/todos/todo.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, Todo = require('models/todo.model')
		, listItemTpl = require('text!templates/listItem.html')
		, FormView = require('views/todos/form.view')
	;

	return Backbone.View.extend({
		//tagName: 'li',
		template: Mustache.compile(listItemTpl),
		initialize: function(options){
			//console.log(this.model.url());
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
		makeEditForm: function() {
			//console.log('label', this.model);
			//var formView = new FormView({model: this.model, catId: this.catId});
			
			this.formView.render();
			
			//$('.form').html(this.formView.render().el);
			
		},
		deleteModel: function(e) {
			e.preventDefault();
			var that = this;
			
			if(this.model.attributes.category_id !== undefined) {
				this.model.url = this.model.url() + "?category=" + this.model.attributes.category_id; 
			}
			
			this.model.destroy({
				success: function(model, response, options) {
					//console.log(response);
					that.remove();
				},
				error: function(model, xhr, options) {
					console.log("error");
				}
			});
			
			
		},
		copyTodo: function(e, cat_id) {
			e.preventDefault();
			
			console.log("copied mode with id: " + this.model.attributes.id + " to category with id: ", cat_id);
			var todo = new Todo(this.model.attributes);
			todo.url = todo.url() + "?category=" + cat_id;
			todo.save({ category_id : cat_id });
		},
		events: {
			'click input[type=checkbox]' : 'toggleStatus',
			'drop' : 'drop',
			'click .form-btn' : 'makeEditForm',
			'click .delete-btn' : 'deleteModel',
			'droppedInto' : 'copyTodo'
		}
	});

});
	
	
	
	
	