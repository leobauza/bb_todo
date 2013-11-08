// Filename: views/todos/todos
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'views/todos/todo',
	'views/todos/form'
], function($, migrate, ui, _, Mustache, Backbone, TodoView, FormView){
	var TodosView = Backbone.View.extend({
		el: '.page ul',
		initialize: function(){
			this.listenTo(this.collection, 'change', this.render);
			//make sortable on initialize
			this.$el.sortable({
				placeholder: "sortable-placeholder",
				//forcePlaceholderSize: true,
				update: function(event, ui) {
					console.log('sort plugin end');
					ui.item.trigger('drop', ui.item.index());
				},
				start: function(event, ui) {
					console.log('sort plugin start')
					ui.placeholder.height(ui.helper.height());
				}
			});
		},
		render: function(){
			console.log('render todos collection');
			this.removeItemViews(); 
			this.collection.forEach(this.addOne, this);
		},
		renderOne: function(id){
			console.log('render one todo');
			this.removeItemViews(); 
			this.collection.where({'id':id}).forEach(this.addOne, this);
		},
		renderForm: function(id) {
			this.removeFormViews();
			this.collection.where({'id':id}).forEach(this.addForm, this);
		},
		addForm: function(todo) {
			var formView = new FormView({model: todo, stuff: "stuff being passed in at initialize"});
			//console.log(todo);
			formView.listenTo(this, 'clean_up_form', formView.remove);
			formView.render();
		},
		addOne: function(todo){
			var todoView = new TodoView({model: todo});
			
			todoView.listenTo(this, 'clean_up', todoView.remove); //have this todoView listen to clean_up!
			todoView.render();
			this.$el.append(todoView.el);
		},
		removeItemViews: function(){
			this.trigger('clean_up');
		},
		removeFormViews: function() {
			this.trigger('clean_up_form');
		},
		sortUpdate: function(event, model, position){
			//Reviewing what is going on here:
			//when attaching .sortable() to the collection el we trigger 'drop' on the ITEM on UPDATE
			//the model view is listening for "drop" and when that happens it triggers update-sort on its el
			//and since thats INSIDE this collection view it triggers sortUpdate...
			//and here we are...
			//console.log(model);
			this.collection.remove(model);
			//remove from the collection so that the next calculations make sense...
			
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position)
					ordinal += 1;
				model.save({'ordinal': ordinal}, {silent:true});
			});
			
			model.save({'ordinal': position});//, {silent:true}); //render my view here!
			this.collection.add(model, {at: position});
			//save and add the model I took out of my collection
					
			//console.log(this.collection);
		
		},
		events: {
			"update-sort" : "sortUpdate"
		}
	});
	return TodosView;
});