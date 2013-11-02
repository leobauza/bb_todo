// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
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

require([
	// Load our app module and pass it to our definition function
	'TodoApp',
], function(TodoApp){
	// The "app" dependency is passed in as "TodoApp"
	TodoApp.initialize();
});