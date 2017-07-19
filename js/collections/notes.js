var app = app || {};

(function() {
	app.noteStorage = app.noteStorage || new Backbone.LocalStorage('notes');
	
	app.NoteCollection = Backbone.Collection.extend({
		model: app.Note,
		url: '/note',
		localStorage: app.noteStorage
	});
})();