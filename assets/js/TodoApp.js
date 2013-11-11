// Filename: TodoApp.js

define(function(require){
	var 
			$ = require('jquery')
		, migrate = require('jqueryM')
		, ui = require('jqueryUI')
		, _ = require('underscore')
		, Mustache = require('mustache')
		, Backbone = require('backbone')
		, Router = require('router')
	;

	//var initialize = function(){
	return function() {
		console.log("return the function to kick stuff off");

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

		//Router.initialize();
		var todoRouter = new Router(bootstrap);

		Backbone.history.start({
			pushState: true,
			silent:true //pass silent true to not trigger the home route on load so you can bootstrap data?
		});

		$('body').on('click', 'a[href^="/"]' ,function(e){
			e.preventDefault();
			// console.log(e.target.pathname);
			// console.log($(e.currentTarget).attr('href'))
			todoRouter.navigate(e.target.pathname, true);
		});
	}

	// return {
	// 	initialize: initialize
	// };
});






