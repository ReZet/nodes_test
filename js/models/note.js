var app = app || {};

(function() {
	app.noteStorage = app.noteStorage || new Backbone.LocalStorage('notes');
	
	app.Note = Backbone.Model.extend({
		urlRoot: '/notes',
		localStorage: app.noteStorage,

		defaults: {
			mess: '',
			tags: []
		}
	});
})();