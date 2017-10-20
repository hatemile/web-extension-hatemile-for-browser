(function() {
    var element;
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        element.appendChild(document.createTextNode(chrome.i18n.getMessage(element.getAttribute('data-i18n'))));
    }
})();

getConfiguration(function(configuration) {
    var element;
    var elements = document.querySelectorAll('[data-configuration]');
    for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        element.value = configuration[element.getAttribute('data-configuration')];
        
        element.addEventListener('change', function(event) {
            var target = event.target;
            configuration[target.getAttribute('data-configuration')] = target.value;
            chrome.storage.sync.set(configuration);
        });
    }
});
