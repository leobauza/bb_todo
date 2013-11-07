// Filename: TodoApp.js
define([
	'jquery',
	'jqueryM',
	'jqueryUI',
	'underscore',
	'mustache',
	'backbone',
	'router', // Request router.js
	//'app', //Request my coffee script thingy i am building
], function($, migrate, ui, _, Mustache, Backbone, Router){

	var initialize = function(){

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

		Router.initialize();

	}

	return {
		initialize: initialize
	};
});






