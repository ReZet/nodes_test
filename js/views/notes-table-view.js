var app = app || {};

(function(){
	app.NoteTableView = Marionette.View.extend({
		tagName: 'div',
		template: '#table',

		regions: {
			body: {
				el: 'tbody',
				replaceElement: true
			}
		},
		
		filterTag: '',
		templateContext: function() {
			return {
				filterTag: this.getOption('filterTag')
			}
		},

		onRender: function() {			
			var NotesView = new app.NoteListView({
				collection: this.collection
			});
			
			console.log(this.options.filterTag);
			if (this.options.filterTag) {
				var filterTag = this.options.filterTag;
							
				var newFilter = function(child, index, collection) {
					var foundTag = false;
					_.each(child.get('tags'), function(elem) {
						console.log(foundTag, elem.text, filterTag);
						foundTag = (foundTag || elem.text == filterTag);
					});
					return foundTag;
				};
				NotesView.setFilter(newFilter, { preventRender: true });
			}
			this.showChildView('body', NotesView);
		},

		events: {
			'click .add': 'addClicked',
			'click .search_tag': 'filterClicked',
			'click .clear_search_tag': 'clearFilterClicked',
		},

		addClicked: function(ev) {
			ev.preventDefault();
			Backbone.history.navigate("notes/new");
			$('#wrapper').empty().append(new app.NoteEditView({model: new app.Note()}).render().$el);		
		},
		
		filterClicked: function(ev) {
			ev.preventDefault();
			var inputTag = $('.searchable_tag').val();
			if (inputTag.length) {
				Backbone.history.navigate("notes/search/" + inputTag);
				var notes = new app.NoteCollection();
				var view  = new app.NoteTableView({collection: notes, filterTag: inputTag});			
				$('#wrapper').empty().append(view.render().$el);
				notes.fetch({reset: true});
			}
		},
		
		clearFilterClicked: function(ev) {
			var notes = new app.NoteCollection();
			var view  = new app.NoteTableView({collection: notes});
			$('#wrapper').empty().append(view.render().$el);

			notes.fetch({reset: true}).done(function() {
				Backbone.history.navigate("notes");				
			});
		}
	});
})();