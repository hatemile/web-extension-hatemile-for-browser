loadStyle('styles/accessiblearia.css', 'accessiblearia');
loadStyle('styles/accessibleformvalidation.css', 'accessibleformvalidation');
loadStyle('scripts/hatemile/css/hide_changes.css', 'hidechanges');
loadScript('hatemile/js/eventlistener.js', 'eventlistenerlist');
loadScript('hatemile/js/hatemile/util/CommonFunctions.js',
        'hatemile-common-functions');
loadScript('hatemile/js/hatemile/util/Configure.js', 'hatemile-configure');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMElement.js',
        'hatemile-vanillahtmldomelement');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMParser.js',
        'hatemile-vanillahtmldomparser');
loadScript('hatemile/js/hatemile/util/html/vanilla/VanillaHTMLDOMTextNode.js',
        'hatemile-vanillahtmldomtextnode');
loadScript('hatemile/js/hatemile/implementation/'
    + 'AccessibleEventImplementation.js', 'hatemile-accessibleevent');
loadScript('hatemile/js/hatemile/implementation/'
    + 'AccessibleFormImplementation.js', 'hatemile-accessibleform');
loadScript('execute.js', 'hatemile-execute');

window.addEventListener('load', function() {
    getUserPreferences(function(userPreferences) {
        var configuration = loadReadOnlyConfiguration(userPreferences);

        var configure = new hatemile.util.Configure(configuration);
        var htmlParser = new hatemile.util.html.vanilla
                .VanillaHTMLDOMParser(document);

        var accessibleAssociation = new hatemile.implementation
                .AccessibleAssociationImplementation(htmlParser, configure);
        accessibleAssociation.associateAllDataCellsWithHeaderCells();
        accessibleAssociation.associateAllLabelsWithFields();

        var accessibleForm = new hatemile.implementation
                .AccessibleFormImplementation(htmlParser, configure);
        accessibleForm.markAllAutoCompleteFields();
        accessibleForm.markAllRangeFields();
        accessibleForm.markAllRequiredFields();

        var accessibleDisplay = new hatemile.implementation
                .AccessibleDisplayScreenReaderImplementation(htmlParser,
                        configure, window.navigator.userAgent);
        accessibleDisplay.displayAllRoles();
        accessibleDisplay.displayAllLanguages();
        accessibleDisplay.displayAllCellHeaders();
        accessibleDisplay.displayAllWAIARIAStates();
        accessibleDisplay.displayAllLinksAttributes();
        accessibleDisplay.displayAllAlternativeTextImages();
        accessibleDisplay.displayAllTitles();
        accessibleDisplay.displayAllShortcuts();

        var accessibleNavigation = new hatemile.implementation
                .AccessibleNavigationImplementation(htmlParser, configure,
                        hatemile_configuration_skippers);
        accessibleNavigation.provideNavigationByAllHeadings();
        accessibleNavigation.provideNavigationToAllLongDescriptions();

        if (userPreferences['skipper-position'] === DISPLAY_BEFORE) {
            accessibleNavigation.provideNavigationByAllSkippers();
        }

        accessibleDisplay.displayAllShortcuts();
    });
});
