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
		, Todo = require('models/todo.model')
		, AddFormView = require('views/todos/addform.view')
		, ListTpl = require('text!templates/listExtras.html')
	;


	return Backbone.View.extend({
		//el: '.page ul',
		tagName: 'ul',
		className: 'todo-list',
		template: Mustache.compile(ListTpl),
		initialize: function(options){
			this.catId = options.catId; //category ID for this todos collection
		},
		render: function(){
			this.removeItemViews();
			this.delegateEvents(); //attaches events again after page switching but NOT after adding a new one!

			//ADD NEW TODO
			var todo = new Todo();
			var addForm = new AddFormView({model: todo, category_id : this.catId, todo_order : this.collection.length });
			todo.listenTo(this, 'clean_up', todo.remove);
			addForm.listenTo(this, 'clean_up', addForm.remove); 
			
			this.listenTo(addForm, 'saved', this.addNew ); //render again!
			
			//END ADD NEW TODO

			$('.page').html(this.template({ category_id : this.catId }));
			$('.list-wrap').append(this.$el);
			$('.add-form').append(addForm.render().el);
			
			this.sortOrMove(true);
			
			
			this.collection.forEach(this.addOne, this); //or just each which comes from _.each()
		
		},
		sortOrMove: function(sort) {
			if(sort === true) {
				this.$el.sortable({
					placeholder: "sortable-placeholder",
					//forcePlaceholderSize: true,
					update: function(event, ui) {
						ui.item.trigger('drop', ui.item.index());
					},
					start: function(event, ui) {
						ui.placeholder.height(ui.helper.height());
					}
				});
			} else {
				this.$el.find('li').addClass('movable');
			}
		},
		makeMovable: function() {
			this.sortOrMove(false);
		},
		renderFront: function() {
			this.removeItemViews();
			this.undelegateEvents(); //attaches events again after page switching but NOT after adding a new one!
			
			$('.page').html(this.template({ category_id : "All" }));
			$('.list-wrap').append(this.$el);
			
			this.collection.forEach(this.addOneFront, this);
		},
		addOne: function(todo){
			var todoView = new TodoView({model: todo, catId: this.catId});
			todoView.listenTo(this, 'clean_up', todoView.remove); //have this todoView listen to clean_up!
			todoView.render();
			this.$el.append(todoView.el);
		},
		addOneFront: function(todo) {
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

			// console.log("collection: ", this.collection);
			// console.log("model:", model.attributes);
			// console.log("position: ", position);
			
			//console.log(model);
			this.collection.remove(model);
			// //remove from the collection so that the next calculations make sense...
			this.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position)
					ordinal += 1;
				model.save({'todo_order': ordinal}); //, {silent:true}); each model updates independently now.
			});
			
			model.save({'todo_order': position});
			this.collection.add(model, {at: position});
			//save and add the model I took out of my collection
		
		},
		addNew: function(model) {
			//console.log("log the model on addNew: ", model);
			var that = this;
			
			this.collection.fetch({
				success: function() {
					that.render();
					that.delegateEvents(); //sorting working after adding a new todo!
				},
				error: function() {
					console.log("error fetching at addNew method");
				}
			});
		
		},
		events: {
			"update-sort" : "sortUpdate",
			"click .move-btn" : "makeMovable"
		}
	});
	
	//sample for each
	// this.collection.forEach(function(el, index, list){
	// 	console.log("element: ", el);
	// 	console.log("index: ", index);
	// 	console.log("list: ", list);
	// }, this);

});