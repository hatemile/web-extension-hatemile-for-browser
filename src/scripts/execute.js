function initHaTeMiLeForBrowser() {
    var i;
    var length;
    var idGenerator = new hatemile.util.IDGenerator('hatemile-execute');
    var htmlParser = new hatemile.util.html.vanilla
            .VanillaHTMLDOMParser(document);

    var accessibleEvent = new hatemile.implementation
            .AccessibleEventImplementation(htmlParser);
    accessibleEvent.makeAccessibleAllClickEvents();
    accessibleEvent.makeAccessibleAllDragandDropEvents();
    accessibleEvent.makeAccessibleAllHoverEvents();

    var accessibleForm = new hatemile.implementation
            .AccessibleFormImplementation(htmlParser);
    accessibleForm.markAllInvalidFields();

    if (typeof hatemile_for_browser_configuration !== typeof undefined) {
        var configure = new hatemile.util
                .Configure(hatemile_for_browser_configuration);
        var accessibleDisplay = new hatemile.implementation
                .AccessibleDisplayScreenReaderImplementation(htmlParser,
                        configure, '');

        var customAttributes = [
            'data-invalidurl', 'data-invalidemail', 'data-invalidrange',
            'data-invaliddate', 'data-invalidtime', 'data-invaliddatetime',
            'data-invalidmonth', 'data-invalidweek', 'data-invalidlength',
            'data-invalidpattern', 'data-invalidrequired'
        ];
        var validateFields = htmlParser.find('[data-changeadded]')
                .listResults();
        for (i = 0, length = validateFields.length; i < length; i++) {
            var field = validateFields[i].getData();
            field.addEventListener('change', function(event) {
                var target = new hatemile.util.html.vanilla
                        .VanillaHTMLDOMElement(event.target);
                if (target.hasAttribute('aria-invalid')) {
                    accessibleDisplay.displayWAIARIAStates(target);
                }

                idGenerator.generateId(target);
                var id = target.getAttribute('id');

                for (var j = 0, len = customAttributes.length; j < len; j++) {
                    var customAttribute = customAttributes[j];
                    if (!target.hasAttribute(customAttribute)) {
                        var invalidDisplay = htmlParser
                                .find('[' + customAttribute + 'beforeof="' + id
                                        + '"],[' + customAttribute + 'afterof="'
                                        + id + '"]').firstResult();
                        if (invalidDisplay !== null) {
                            invalidDisplay.removeNode();
                        }
                    }
                }
            });
        }
    }

    var forms = htmlParser.find('form').listResults();
    for (i = 0, length = forms.length; i < length; i++) {
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
}

window.addEventListener('load', initHaTeMiLeForBrowser);
