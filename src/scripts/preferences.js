(function() {
    var element;
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        element.appendChild(document.createTextNode(chrome.i18n.getMessage(
            element.getAttribute('data-i18n')
        )));
    }
})();

getUserPreferences(function(configuration) {
    var element;
    var elements = document.querySelectorAll('[data-configuration]');
    for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        element.value = configuration[element.getAttribute(
            'data-configuration'
        )];

        element.addEventListener('change', function(event) {
            var target = event.target;
            configuration[target.getAttribute('data-configuration')] = (
                target.value
            );
            if (
                (typeof browser !== typeof undefined)
                && (browser.storage)
                && (browser.storage.local)
                && (browser.storage.local.set)
            ) {
                browser.storage.local.set(configuration);
            } else {
                chrome.storage.sync.set(configuration);
            }
        });
    }
});
