// Filename: views/todos/form.view

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		,formTpl = require('text!templates/form.html')
	;



	return Backbone.View.extend({
		template: Mustache.compile(formTpl),
		initialize: function(){
			//this.listenTo(this.model , 'change', this.render); needs to only update if not typing
			this.listenTo(this.model , 'change:status', this.render);
		},
		render: function(options){
			this.setElement(this.template(this.model.attributes));
			$('.form').html(this.el);
			return this;
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
						//silent:true, //make it silent so that the list doesn't update causing sort problems...(other solutions????)
						success: function(model, response){
							console.log("success: ", todoDetails);
							console.warn("two json responses causes this to return the error method...");
						},
						error: function(model, response){
							console.log("error: ", model);
							console.log("error:", response);
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
});
