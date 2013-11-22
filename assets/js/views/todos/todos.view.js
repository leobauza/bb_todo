// Filename: views/todos/todos.view
define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, TodoView = require('views/todos/todo.view')
		, FormView = require('views/todos/form.view')
	;


	return Backbone.View.extend({
		//el: '.page ul',
		tagName: 'ul',
		className: 'todo-list',
		initialize: function(options){
			this.catId = options.catId; //category ID for this todos collection
		},
		render: function(){
			
			$('.page').append(this.$el);
			
			this.$el.sortable({
				placeholder: "sortable-placeholder",
				//forcePlaceholderSize: true,
				update: function(event, ui) {
					console.log('end sort =====================================================================> ');
					ui.item.trigger('drop', ui.item.index());
				},
				start: function(event, ui) {
					console.log('start sort');
					ui.placeholder.height(ui.helper.height());
				}
			});
			
			//sample for each
			// this.collection.forEach(function(el, index, list){
			// 	console.log("element: ", el);
			// 	console.log("index: ", index);
			// 	console.log("list: ", list);
			// }, this);

			this.removeItemViews();
			this.collection.forEach(this.addOne, this); //or just each which comes from _.each()
		},
		addOne: function(todo){
			var todoView = new TodoView({model: todo, catId: this.catId});
			
			todoView.listenTo(this, 'clean_up', todoView.remove); //have this todoView listen to clean_up!
			todoView.render();
			this.$el.append(todoView.el);
		},
		removeItemViews: function(){
			this.trigger('clean_up');
		},
		sortUpdate: function(event, model, position){
			//Reviewing what is going on here:
			//when attaching .sortable() to the collection el we trigger 'drop' on the ITEM on UPDATE
			//the model view is listening for "drop" and when that happens it triggers update-sort on its el
			//and since thats INSIDE this collection view it triggers sortUpdate...
			//and here we are...
			
			console.log("collection: ", this.collection);
			console.log("model:", model.attributes);
			console.log("position: ", position);
			
			//console.log(model);
			this.collection.remove(model);
			// //remove from the collection so that the next calculations make sense...
			// 
			// 
			// 
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position)
					ordinal += 1;
				model.set({'todo_order': ordinal}, {silent:true});
			});
			
			model.set({'todo_order': position});//, {silent:true}); //render my view here!
			this.collection.add(model, {at: position});
			//save and add the model I took out of my collection

			console.log("<===================== END OF THIS =====================>", this.collection);
		
		},
		events: {
			"update-sort" : "sortUpdate"
		}
	});
	

});