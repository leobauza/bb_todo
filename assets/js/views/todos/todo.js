// Filename: views/todos/todo

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, listItemTpl = require('text!templates/listItem.html')
		// , TodoView = require('views/todos/todo')
		// , TodosCollection = require('collections/todos')
		// , TodosView = require('views/todos/todos')
		, FormView = require('views/todos/form')
		// , CategoryView = require('views/categories/category')
		// , CategoriesView = require('views/categories/categories')
		// , CategoriesCollection = require('collections/categories')
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
			var catId = {catId: this.catId}; //inserting this cat ID was enterily too complicated....
			(this.model.attributes.status == "incomplete")? switcher = {checkbox: false} : switcher = {checkbox:true};
			var tplObj = _.extend(switcher, this.model.attributes, catId); //order matters...attrs first would modify the attrs and we dont want that...
			this.setElement(this.template(tplObj));
		
		},
		statusUpdate: function() {
			console.log('status update', this.model);
			this.$el.toggleClass('complete'); //much lower resource intensive than rerendering the whole collection
			//and if there is content to update...
			//this is because I am setting the element to the template output so updating it is trickier...
			var catId = {catId: this.catId}; //inserting this cat ID was enterily too complicated....
			(this.model.attributes.status == "incomplete")? switcher = {checkbox: false} : switcher = {checkbox:true};
			var tplObj = _.extend(switcher, this.model.attributes, catId); //order matters...attrs first would modify the attrs and we dont want that...
			this.$el.html($(this.template(tplObj)).html());

		},
		toggleStatus: function() {
			this.model.toggleStatus();
		},
		drop: function(event, index) {
			//console.log(this.model);
			this.$el.trigger('update-sort', [this.model, index]);
		},
		test: function() {
			//console.log('label', this.model);
			//var formView = new FormView({model: this.model, catId: this.catId});
			
			$('.form').html(this.formView.render().el);
			
		},
		events: {
			'click input[type=checkbox]' : 'toggleStatus',
			'drop' : 'drop',
			'click .form-btn' : 'test'
		}
	});

});
	
	
	
	
	