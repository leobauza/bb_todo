/* 
 * =============================================================
 * HELPERS
 * =============================================================
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			if(this.value == '') {
				
			} else {
				o[this.name].push(this.value || '');
			}
		} else {
			if(this.value == '') {
				
			} else {
				o[this.name] = this.value || '';
			}
		}
	});
	return o;
};

/* 
 * =============================================================
 * GLOBAL (global object for namespace)
 * =============================================================
 */
var App = new (Backbone.View.extend({
	Models: {},
	Views: {},
	Collections: {},
	events: {
		'click a[href^="/"]' : function(e){
			// console.log(e.target.pathname);
			// console.log($(e.currentTarget).attr('href'))
			router.navigate(e.target.pathname, true);
			e.preventDefault();
		}
	},
	
	start: function(e){
		Backbone.history.start({
			pushState: true,
			silent:true //pass silent true to not trigger the home route on load so you can bootstrap data?
		});
	}
}))({el: document.body});

$(function(){
	App.start();
});

/* 
 * =============================================================
 * MODELS
 * =============================================================
 */
	App.Models.Todo = Backbone.Model.extend({
		urlRoot: '/api/todos', //remember this is URL ROOT not URL
		defaults: {
			'description' : 'empty to do..',
			'status' : 'incomplete'
		},
		initialize: function(){
			this.on('change', this.change);
		},
		change: function(){
			// console.log('CHANGE: model ' + this.attributes.id + ' description:')
			// console.log('CHANGE: ' + this.attributes.status);
		},
		toggleStatus: function(){
			var $status = this.get('status');
			($status == 'incomplete') ? this.set({'status':'complete'}) : this.set({'status':'incomplete'});
			this.save();
		}
	});

/* 
 * =============================================================
 * COLLECTIONS
 * =============================================================
 */
	App.Collections.Todos = Backbone.Collection.extend({
		url: '/api/todos',
		model: App.Models.Todo,
		comparator: 'ordinal'
	});

/* 
 * =============================================================
 * VIEWS
 * =============================================================
 */
	App.Views.TodoView = Backbone.View.extend({
		//tagName: 'li',
		template: Mustache.compile($('#todo-tpl').html()),
		initialize: function(){
			//this.listenTo(router, "route:single | route:home", this.remove);
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

	App.Views.TodosView = Backbone.View.extend({
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
			console.log('render all');
			this.removeItemViews(); 
			this.collection.forEach(this.addOne, this);
		},
		renderOne: function(id){
			console.log('render one');
			this.removeItemViews(); 
			this.collection.where({'id':id}).forEach(this.addOne, this);
		},
		addOne: function(todo){
			var todoView = new App.Views.TodoView({model: todo});
			
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

	App.Views.FormView = Backbone.View.extend({
		template: Mustache.compile($('#todo-form-tpl').html()),
		initialize: function(){
			console.log(this.options.stuff); //see router to see stuff being passed
		},
		render: function(){

			//check if the body is empty and fill it up...

			console.log(this.model.attributes);
			
			this.setElement(this.template(this.model.attributes));
			$('.form').html(this.el);
		},
		autoSaver: function(e){
			
			//some vars
			var that = this;
			var $target = $(e.currentTarget);
			var index = $target.index();
			
			//auto save timer
			//when you focus a time is start to save every 5 seconds...
			//once saved it starts over as called by the auto save function
			var saveTimer = [];
			saveTimer[index] = setTimeout(function(){autoSave('auto')}, 5000);

			//save at the end of typing
			var typeTimer = [];
			$target.keyup(function(){
				clearTimeout(typeTimer[index]);
				if ($target.val) {
					typeTimer[index] = setTimeout(function(){autoSave('type')}, 1000);
				}
			});

			//initial target value
			var $targetVal = $target.val();
			//auto save func
			function autoSave(source){
				//value at save trigger
				var $newTargetVal = $target.val();
				
				if($targetVal == $newTargetVal) {
					//console.log('value is the same so don\'t do anything');
				} else {
					console.log('value has changed so do something!');
					//set target val to new target val to re-evaluate
					$targetVal = $newTargetVal;

					//only log the details if the value has changed!
					var todoDetails = $(e.currentTarget).closest('form').serializeObject();
					that.model.save(todoDetails,{
						silent:true, //make it silent so that the list doesn't update causing sort problems...(other solutions????)
						success: function(){
							console.log(todoDetails);
						}
					});	

				}
				
				//console.log(source);
				if(source == 'auto') {
					saveTimer[index] = setTimeout(function(){autoSave(source)}, 5000);
				}
				//console.log("this log brought to you by index: " + index);
				
			}

			$target.blur(function(){
				
				//CHECK if there are differences and save on blur...??
				//probably not because if there is a difference it woulda been saved when typing...
				clearTimeout(saveTimer[index]);
				$target.unbind();
			});

			
		},
		events: {
			'focus input[type="text"], textarea':'autoSaver'
		}
	});
/* 
 * =============================================================
 * ROUTER
 * =============================================================
 */

	App.TodoRouter = Backbone.Router.extend({
		routes: {
			"" : "home",
			"todos/:id" : "single",
			"form/:id" : "form"
		},
		initialize: function(bootstrap){
			console.log("bootstrapping models from the server!")
			this.todos = new App.Collections.Todos(bootstrap.todos); //bootstrap defined at the top in a script tag

			this.todosView = new App.Views.TodosView({
				collection:this.todos
			});
			
			//console.log(this.todos.models);
			this.todosView.render();

			this.fetching = this.todos.fetch({silent:true}); //silently fetch after render??
			
			
		}
	});

	var router = new App.TodoRouter(bootstrap);

	//home
	router.on('route:home', function(){
		var that = this;
		//after fetching call render (on the collection view)
		this.fetching.done(function(){
			that.todosView.render();
		});

	});
	//single
	router.on('route:single', function(id){
		var that = this;
		//after fetching call render one (on the collection view) and pass the id
		this.fetching.done(function(){
			that.todosView.renderOne(id);
		});
		

	});
	//form
	router.on('route:form', function(id){
		var that = this;
		this.fetching.done(function(){
			//considering doing this through todosView so that it can populate the 
			//main list area on landing...
			that.todos.where({'id':id}).forEach(function(model){
				//console.log(model);
				var formView = new App.Views.FormView({
					model:model,
					stuff:"my stuff"
				});
				formView.render();
			});
		});

	});

