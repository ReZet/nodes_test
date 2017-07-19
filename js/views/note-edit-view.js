var app = app || {};

(function() {
	app.NoteEditView = Marionette.View.extend({
		tagName: 'div',
		template: '#edit-note',		
		regions: {
			tags: {
				el: 'ul',
				replaceElement: true
			}
		},
		events: {
			'submit form': 'submitClicked',
			'click .cancel': 'cancelClicked'
		},
		
		onRender: function() {
			var tags = this.model.get('tags');
			if (tags.length) {
				var tagView = new app.TagsView({
					collection: new Backbone.Collection(tags)
				});
				this.showChildView('tags', tagView);
			}
		},		

		submitClicked: function(ev) {
			ev.preventDefault();
			var data = {};
			this.$("input[type!='submit'], textarea, select").each(function() {
			    data[$(this).attr("name")] = $(this).val();
			});
			
			if (data['mess']) {
				var tags = data['mess'].match( /\#[\w\d_-]*/ig );
				if (tags && tags.length) {
					data['tags'] = [];
					_.each(tags, function(tag) {
						data['tags'].push({text: tag.substr(1)});
					});
				}
			}
			this.model.set(data);
			this.model.save().done(function() {
				var notes = new app.NoteCollection();
				var view  = new app.NoteTableView({collection: notes});
				$('#wrapper').empty().append(view.render().$el);

				notes.fetch({reset: true}).done(function() {
					Backbone.history.navigate("notes");				
				});
			});
		},
		
		cancelClicked: function() {
			var notes = new app.NoteCollection();
			var view  = new app.NoteTableView({collection: notes});
			$('#wrapper').empty().append(view.render().$el);

			notes.fetch({reset: true}).done(function() {
				Backbone.history.navigate("notes");				
			});
		}
	});
})();

