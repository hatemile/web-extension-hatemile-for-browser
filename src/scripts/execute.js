initHaTeMiLeForBrowser = function() {
    var configure = new hatemile.util
            .Configure({'prefix-generated-ids': 'id-cs-hatemile-firefox-'
            + Math.random().toString(36).substring(7)});
    var htmlParser = new hatemile.util.html.vanilla
            .VanillaHTMLDOMParser(document);

    var accessibleEvent = new hatemile.implementation
            .AccessibleEventImplementation(htmlParser);
    accessibleEvent.makeAccessibleAllClickEvents();
    accessibleEvent.makeAccessibleAllDragandDropEvents();
    accessibleEvent.makeAccessibleAllHoverEvents();

    var accessibleForm = new hatemile.implementation
            .AccessibleFormImplementation(htmlParser, configure);
    accessibleForm.markAllInvalidFields();

    var forms = htmlParser.find('form').listResults();
    for (var i = 0, length = forms.length; i < length; i++) {
        forms[i].getData().addEventListener('submit', function() {
            var elements = htmlParser.find('.container-skippers,'
                + '.container-heading,.skipper-anchor,.heading-anchor,'
                + '.longdescription-link').listResults();
            for (var j = 0, length2 = elements.length; j < length2; j++) {
                elements[j].removeNode();
            }
        });
    }
    window.removeEventListener('load', initHaTeMiLeForBrowser, false);
};

window.addEventListener('load', initHaTeMiLeForBrowser);
