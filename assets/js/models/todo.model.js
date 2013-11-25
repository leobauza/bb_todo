// Filename: models/todo.model

define(function(require){
	var
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
	;


	return Backbone.Model.extend({
		//urlRoot: '/api/todos', //remember this is URL ROOT not URL
		urlRoot: function() {
			if(this.attributes.categorized) {
				return '/api/cat/todos';
			} else {
				return '/api/todos';
			}
		},
		defaults: {
			'description' : 'empty to do..',
			'status' : 'incomplete'
		},
		toggleStatus: function(){
			var $status = this.get('status');
			($status == 'incomplete') ? this.set({'status':'complete'}) : this.set({'status':'incomplete'});
			this.save();
		}
	});
});
