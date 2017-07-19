var app = app || {};

(function() {
	app.EmptyView = Marionette.View.extend({
		tagName: 'tr',
		className: 'error',
		template: '#no-notes',
	});
})();

