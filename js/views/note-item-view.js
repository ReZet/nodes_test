var app = app || {};

(function(){
	app.NoteView = Marionette.View.extend({
		tagName:  'tr',
		template: '#item-note',
		events: {
			'click .remove': 'removeClicked',
			'click .edit':   'editClicked'
		},

		removeClicked: function(ev) {
			ev.preventDefault();
			this.remove();
			this.model.destroy();
		},

		editClicked: function(ev) {
			ev.preventDefault();
			Backbone.history.navigate("notes/" + this.model.get('id') + "/edit");
			$('#wrapper').empty().append(new app.NoteEditView({model: this.model}).render().$el);
		}
	});
})();

