var app = app || {};

(function() {
	app.Router = Backbone.Router.extend({
		routes: {
			"": "listNotes",
			"notes": "listNotes",
			"notes/search/:tag": "filterNotes",
			"notes/:id/edit": "editNote",
			"notes/new": "newNote"
		},
		filterNotes: function(tag) {
			var notes = new app.NoteCollection();
			var view  = new app.NoteTableView({collection: notes, filterTag: tag});			
			$('#wrapper').empty().append(view.render().$el);
			notes.fetch({reset: true});
		},
		listNotes: function() {
			var notes = new app.NoteCollection();			
			var view  = new app.NoteTableView({collection: notes});
			$('#wrapper').empty().append(view.render().$el);
			notes.fetch({reset: true});
		},
		editNote: function(id) {
			var note = new app.Note({id: id});
			note.fetch({success: function() {				
				var view = new app.NoteEditView({model: note});
				$('#wrapper').empty().append(view.render().$el);
			}});
		},
		newNote: function() {
			var note = new app.Note();
			var view = new app.NoteEditView({model: note});
			$('#wrapper').empty().append(view.render().$el);
		}
	});
})();

