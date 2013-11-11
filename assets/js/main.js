// Filename: main.js

require.config({
	paths: {
		'jquery': 'libs/jquery/jquery',
		'jqueryM': 'libs/jquery/jquery-migrate',
		'jqueryUI': 'libs/jquery/jquery-ui.custom',
		'underscore': 'libs/underscore/underscore',
		'mustache': 'libs/mustache/mustache',
		'backbone': 'libs/backbone/backbone'
	},
	//Shim for non amd ready stuff and for jquery dependencies
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'jqueryM': {
			deps: ['jquery'],
			exports: 'migrate'
		},
		'jqueryUI': {
			deps: ['jquery'],
			exports: 'ui'
		}
	}
});

require(['TodoApp'], function(TodoApp){
	new TodoApp(); //kick off the app
});