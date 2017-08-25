initHaTeMiLeForBrowser = function() {
	try {
		var configure = new hatemileforbrowser.hatemile.util.Configure({'prefix-generated-ids': 'id-cs-hatemile-firefox-' + Math.random().toString(36).substring(7)});
		var htmlParser = new hatemileforbrowser.hatemile.util.html.vanilla.VanillaHTMLDOMParser(document);

		var accessibleEvent = new hatemileforbrowser.hatemile.implementation.AccessibleEventImplementation(htmlParser);
		accessibleEvent.makeAccessibleAllClickEvents();
		accessibleEvent.makeAccessibleAllDragandDropEvents();
		accessibleEvent.makeAccessibleAllHoverEvents();

		var accessibleForm = new hatemileforbrowser.hatemile.implementation.AccessibleFormImplementation(htmlParser, configure);
		accessibleForm.markAllInvalidFields();

		var forms = htmlParser.find('form').listResults();
		for (var i = 0, length = forms.length; i < length; i++) {
			forms[i].getData().addEventListener('submit', function() {
				var elements = htmlParser.find('.container-skippers,.container-heading,.skipper-anchor,.heading-anchor,.longdescription-link').listResults();
				for (var j = 0, length2 = elements.length; j < length2; j++) {
					elements[j].removeNode();
				}
			});
		}
		
		if ((window.hatemile)
				&& (window.hatemile.implementation)
				&& (window.hatemile.implementation.AccessibleDisplayScreenReaderImplementation)) {
			var styleElement = document.createElement('style');
			styleElement.setAttribute('type', 'text/css');
			styleElement.appendChild(document.createTextNode('[aria-checked]:before'
					+ ', [aria-checked]:after, [aria-pressed]:before, [aria-pressed]:after'
					+ ', [aria-selected]:before, [aria-selected]:after, [aria-orientation]:before'
					+ ', [aria-orientation]:after, [aria-level]:before, [aria-level]:after'
					+ ', [aria-sort]:before, [aria-sort]:after, [download]:before'
					+ ', [download]:after, [target]:before, [target]:after, [draggable]:before'
					+ ', [draggable]:after, [aria-grabbed]:before, [aria-grabbed]:after'
					+ ', [title]:before, [title]:after, [aria-label]:before, [aria-label]:after'
					+ ', [dropzone]:before, [dropzone]:after, [aria-dropeffect]:before'
					+ ', [aria-dropeffect]:after, [aria-expanded]:before, [aria-expanded]:after'
					+ ', [aria-haspopup]:before, [aria-haspopup]:after, [accesskey]:before'
					+ ', [accesskey]:after, [aria-busy]:before, [aria-busy]:after {'
					+ 'content: "";'
					+ '}'));
			if (document.head) {
				document.head.appendChild(styleElement);
			} else {
				document.body.appendChild(styleElement);
			}
		}
	} catch (e) {}
	window.removeEventListener('load', initHaTeMiLeForBrowser, false);
};

window.addEventListener('load', initHaTeMiLeForBrowser);
