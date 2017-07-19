var app = app || {};

(function() {	
	app.TagsView = Mn.CollectionView.extend({
		tagName: 'ul',
		className: 'list-inline list-unstyled',
		childView: app.TagEditView
	});
})();