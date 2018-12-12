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
    function uuidv4() {
        if (configuration['user-uuid'] === undefined) {
            configuration['user-uuid'] = (
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                    /[xy]/g,
                    function(c) {
                        var r = Math.random() * 16 | 0;
                        var v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    }
                )
            );
            saveConfiguration();
        }
        return configuration['user-uuid'];
    }

    function serialize(obj, prefix) {
        var str = [];
        var p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + '[' + p + ']' : p;
                var v = obj[p];
                if ((v !== null) && (typeof v === 'object')) {
                    str.push(serialize(v, k));
                } else {
                    str.push(
                        encodeURIComponent(k) + '=' + encodeURIComponent(v)
                    );
                }
            }
        }
        return str.join('&');
    }

    function ajaxRequest(parameters) {
        var httpRequest = new XMLHttpRequest();
        var url = 'https://translationreceiver.herokuapp.com/';
        var params = serialize(parameters);
        httpRequest.open('POST', url, true);

        //Send the proper header information along with the request
        httpRequest.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        );

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    alert(chrome.i18n.getMessage('hatemile_translation_sent'));
                } else {
                    alert(chrome.i18n.getMessage(
                        'hatemile_translation_not_sent')
                    );
                }
            }
        }
        httpRequest.send(params);
    }

    function saveConfiguration() {
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
    }

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
            saveConfiguration();
        });
    }

    var preferencesForm = document.getElementById('preferences-form');
    preferencesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var inputs = document.querySelectorAll('input[type="text"]');
        var requestParameters = {
            'uuid': uuidv4(),
            'language': navigator.language
        };
        for (var i = 0, length = inputs.length; i < length; i++) {
            var input = inputs[i];
            requestParameters[input.getAttribute('id')] = input.value;
        }
        ajaxRequest(requestParameters);
    });
});
