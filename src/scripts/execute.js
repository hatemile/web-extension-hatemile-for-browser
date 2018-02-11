initHaTeMiLeForBrowser = function() {
    var i;
    var length;
    var idGenerator = new hatemile.util.IDGenerator('hatemile-execute');
    var htmlParser = new hatemile.util.html.vanilla
            .VanillaHTMLDOMParser(document);
    var configure = new hatemile.util
            .Configure(hatemile_for_browser_configuration);

    var accessibleEvent = new hatemile.implementation
            .AccessibleEventImplementation(htmlParser);
    accessibleEvent.makeAccessibleAllClickEvents();
    accessibleEvent.makeAccessibleAllDragandDropEvents();
    accessibleEvent.makeAccessibleAllHoverEvents();

    var accessibleForm = new hatemile.implementation
            .AccessibleFormImplementation(htmlParser);
    accessibleForm.markAllInvalidFields();

    var accessibleDisplay = new hatemile.implementation
            .AccessibleDisplayScreenReaderImplementation(htmlParser, configure,
                    '');

    var validateFields = htmlParser.find('[data-changeadded]').listResults();
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
            if (!target.hasAttribute('data-invalidurl')) {
                var invalidURLDisplay = htmlParser
                        .find('[data-invalidurlbeforeof="' + id
                        + '"],[data-invalidurlafterof="' + id + '"]')
                        .firstResult();
                if (invalidURLDisplay !== null) {
                    invalidURLDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidemail')) {
                var invalidEmailDisplay = htmlParser
                        .find('[data-invalidemailbeforeof="' + id
                        + '"],[data-invalidemailafterof="' + id + '"]')
                        .firstResult();
                if (invalidEmailDisplay !== null) {
                    invalidEmailDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidrange')) {
                var invalidRangeDisplay = htmlParser
                        .find('[data-invalidrangebeforeof="' + id
                        + '"],[data-invalidrangeafterof="' + id + '"]')
                        .firstResult();
                if (invalidRangeDisplay !== null) {
                    invalidRangeDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invaliddate')) {
                var invalidDateDisplay = htmlParser
                        .find('[data-invaliddatebeforeof="' + id
                        + '"],[data-invaliddateafterof="' + id + '"]')
                        .firstResult();
                if (invalidDateDisplay !== null) {
                    invalidDateDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidtime')) {
                var invalidTimeDisplay = htmlParser
                        .find('[data-invalidtimebeforeof="' + id
                        + '"],[data-invalidtimeafterof="' + id + '"]')
                        .firstResult();
                if (invalidTimeDisplay !== null) {
                    invalidTimeDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invaliddatetime')) {
                var invalidDateTimeDisplay = htmlParser
                        .find('[data-invaliddatetimebeforeof="' + id
                        + '"],[data-invaliddatetimeafterof="' + id + '"]')
                        .firstResult();
                if (invalidDateTimeDisplay !== null) {
                    invalidDateTimeDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidmonth')) {
                var invalidMonthDisplay = htmlParser
                        .find('[data-invalidmonthbeforeof="' + id
                        + '"],[data-invalidmonthafterof="' + id + '"]')
                        .firstResult();
                if (invalidMonthDisplay !== null) {
                    invalidMonthDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidweek')) {
                var invalidWeekDisplay = htmlParser
                        .find('[data-invalidweekbeforeof="' + id
                        + '"],[data-invalidweekafterof="' + id + '"]')
                        .firstResult();
                if (invalidWeekDisplay !== null) {
                    invalidWeekDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidlength')) {
                var invalidLengthDisplay = htmlParser
                        .find('[data-invalidlengthbeforeof="' + id
                        + '"],[data-invalidlengthafterof="' + id + '"]')
                        .firstResult();
                if (invalidLengthDisplay !== null) {
                    invalidLengthDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidpattern')) {
                var invalidPatternDisplay = htmlParser
                        .find('[data-invalidpatternbeforeof="' + id
                        + '"],[data-invalidpatternafterof="' + id + '"]')
                        .firstResult();
                if (invalidPatternDisplay !== null) {
                    invalidPatternDisplay.removeNode();
                }
            }
            if (!target.hasAttribute('data-invalidrequired')) {
                var invalidRequiredDisplay = htmlParser
                        .find('[data-invalidrequiredbeforeof="' + id
                        + '"],[data-invalidrequiredafterof="' + id + '"]')
                        .firstResult();
                if (invalidRequiredDisplay !== null) {
                    invalidRequiredDisplay.removeNode();
                }
            }
        });
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
};

window.addEventListener('load', initHaTeMiLeForBrowser);
