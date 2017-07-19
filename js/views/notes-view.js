var app = app || {};

(function() {
	app.NoteListView = Marionette.CollectionView.extend({
		tagName: 'tbody',
		template: '#list-notes',
		childView: app.NoteView,
		emptyView: app.EmptyView,
	});
})();

