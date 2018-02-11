var NOT_DISPLAY = 0;
var DISPLAY_BEFORE = 1;
var DISPLAY_AFTER = 2;

function loadScript(file, identifier) {
    if (!document.getElementById(identifier)) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', identifier);
        script.setAttribute('src', chrome.runtime.getURL('scripts/' + file));
        document.documentElement.appendChild(script);
    }
}

function loadStyle(file, identifier) {
    if (!document.getElementById(identifier)) {
        var style = document.createElement('link');
        style.setAttribute('type', 'text/css');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('id', identifier);
        style.setAttribute('href', chrome.runtime.getURL(file));
        document.documentElement.appendChild(style);
    }
}

function getPreference(configuration, preference, display) {
    if (display) {
        return configuration[preference];
    } else {
        return '';
    }
}

function getBeforePreference(configuration, preference, position) {
    return getPreference(configuration, preference,
            configuration[position] === DISPLAY_BEFORE);
}

function getAfterPreference(configuration, preference, position) {
    return getPreference(configuration, preference,
            configuration[position] === DISPLAY_AFTER);
}

function setLanguages(configuration) {
    var languageCode;
    var languageCodes = [
        'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az',
        'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce',
        'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee',
        'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr',
        'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr',
        'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is',
        'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn',
        'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln',
        'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms',
        'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv',
        'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu',
        'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk',
        'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta',
        'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw',
        'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi',
        'yo', 'za', 'zh', 'zu'
    ];

    for (var i = 0, length = languageCodes.length; i < length; i++) {
        languageCode = languageCodes[i];
        configuration['language-' + languageCode] = chrome.i18n
                .getMessage('extensions_hatemile_language_' + languageCode);
    }
}

function setRoles(configuration) {
    var role;
    var roles = [
        'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
        'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo',
        'definition', 'dialog', 'directory', 'document', 'form', 'grid',
        'gridcell', 'group', 'heading', 'img', 'link', 'list', 'listbox',
        'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar',
        'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'note',
        'option', 'progressbar', 'radio', 'radiogroup', 'region', 'row',
        'rowgroup', 'rowheader', 'scrollbar', 'search', 'separator', 'slider',
        'spinbutton', 'status', 'tab', 'tablist', 'tabpanel', 'textbox',
        'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem'
    ];

    for (var i = 0, length = roles.length; i < length; i++) {
        role = roles[i];
        configuration['role-' + role] = chrome.i18n
                .getMessage('extensions_hatemile_role_' + role);
    }
}

function setSimpleAttributes(configuration, userPreferences) {
    var attribute;
    var attributeSeparated;
    var attributePrefix;
    var attributes = [
        'aria-autocomplete-both', 'aria-autocomplete-inline',
        'aria-autocomplete-list', 'aria-dropeffect-copy',
        'aria-dropeffect-move', 'aria-dropeffect-link',
        'aria-dropeffect-execute', 'aria-dropeffect-popup',
        'aria-grabbed-true',
        'aria-grabbed-false', 'aria-haspopup-true',
        'aria-level-prefix', 'aria-level-suffix', 'aria-required-true',
        'attribute-title-prefix',
        'attribute-title-suffix', 'attribute-target-blank',
        'attribute-data-invalid-url', 'attribute-data-invalid-email',
        'attribute-data-invalid-range', 'attribute-data-invalid-length',
        'attribute-data-invalid-pattern', 'attribute-data-invalid-required',
        'attribute-data-invalid-date', 'attribute-data-invalid-time',
        'attribute-data-invalid-datetime', 'attribute-data-invalid-month',
        'attribute-data-invalid-week', 'attribute-headers-prefix',
        'attribute-headers-suffix', 'attribute-longdescription-prefix',
        'attribute-longdescription-suffix'
    ];

    for (var i = 0, length = attributes.length; i < length; i++) {
        attribute = attributes[i];

        attributeSeparated = attribute.split('-');
        attributeSeparated.pop();
        attributePrefix = attributeSeparated.join('-');

        configuration[attribute + '-before'] =
                getBeforePreference(userPreferences, attribute,
                        attributePrefix + '-position');
        configuration[attribute + '-after'] =
                getAfterPreference(userPreferences, attribute,
                        attributePrefix + '-position');
    }
}

function setSimpleUserPreferences(keys) {
    var attribute;
    var attributes = [
        'aria-autocomplete-both', 'aria-autocomplete-inline',
        'aria-autocomplete-list', 'aria-dropeffect-copy',
        'aria-dropeffect-move', 'aria-dropeffect-link',
        'aria-dropeffect-execute', 'aria-dropeffect-popup',
        'aria-grabbed-true',
        'aria-grabbed-false', 'aria-haspopup-true',
        'aria-level-prefix', 'aria-level-suffix', 'aria-required-true',
        'aria-value-maximum-prefix',
        'aria-value-maximum-suffix', 'aria-value-minimum-prefix',
        'aria-value-minimum-suffix', 'attribute-title-prefix',
        'attribute-title-suffix', 'attribute-accesskey-default',
        'attribute-accesskey', 'attribute-accesskey-prefix',
        'attribute-accesskey-suffix', 'attribute-target-blank',
        'attribute-download', 'attribute-data-invalid-url',
        'attribute-data-invalid-email', 'attribute-data-invalid-range',
        'attribute-data-invalid-length', 'attribute-data-invalid-pattern',
        'attribute-data-invalid-required', 'attribute-data-invalid-date',
        'attribute-data-invalid-time', 'attribute-data-invalid-datetime',
        'attribute-data-invalid-month', 'attribute-data-invalid-week',
        'attribute-language-prefix-before', 'attribute-language-suffix-before',
        'attribute-language-prefix-after', 'attribute-language-suffix-after',
        'attribute-role-prefix-before', 'attribute-role-suffix-before',
        'attribute-role-prefix-after', 'attribute-role-suffix-after',
        'attribute-headers-prefix', 'attribute-headers-suffix',
        'attribute-longdescription-prefix', 'attribute-longdescription-suffix',
        'elements-heading', 'skipper-main-content', 'skipper-shortcuts-list',
        'skipper-table-contents'
    ];

    for (var i = 0, length = attributes.length; i < length; i++) {
        attribute = attributes[i];

        keys[attribute] = chrome.i18n.getMessage('extensions_hatemile_'
            + attribute.replace(/-/g, '_'));
    }
}

function getUserPreferences(callback) {
    var keys = {
        'aria-autocomplete-position': DISPLAY_AFTER,
        'aria-dropeffect-position': DISPLAY_AFTER,
        'aria-grabbed-position': DISPLAY_AFTER,
        'aria-haspopup-position': DISPLAY_AFTER,
        'aria-level-position': DISPLAY_BEFORE,
        'aria-required-position': DISPLAY_AFTER,
        'aria-value-position': DISPLAY_AFTER,
        'attribute-title-position': DISPLAY_BEFORE,
        'attribute-accesskey-page-position': DISPLAY_AFTER,
        'attribute-accesskey-element-position': DISPLAY_AFTER,
        'attribute-target-position': DISPLAY_BEFORE,
        'attribute-download-position': DISPLAY_BEFORE,
        'attribute-data-invalid-position': DISPLAY_AFTER,
        'attribute-headers-position': DISPLAY_BEFORE,
        'attribute-longdescription-position': DISPLAY_AFTER,
        'elements-heading-position': DISPLAY_AFTER
    };

    setSimpleUserPreferences(keys);

    if ((typeof browser !== typeof undefined) && (browser.storage) &&
            (browser.storage.local) && (browser.storage.local.get)) {
        var settings = browser.storage.local.get(keys);
        settings.then(callback, function () {});
    } else {
        chrome.storage.sync.get(keys, callback);
    }
}

function loadReadOnlyConfiguration(userPreferences) {
    var configuration = {
        'aria-busy-true-before': '',
        'aria-busy-true-after': '',
        'aria-checked-true-before': '',
        'aria-checked-true-after': '',
        'aria-checked-false-before': '',
        'aria-checked-false-after': '',
        'aria-checked-mixed-before': '',
        'aria-checked-mixed-after': '',
        'aria-expanded-true-before': '',
        'aria-expanded-true-after': '',
        'aria-expanded-false-before': '',
        'aria-expanded-false-after': '',
        'aria-invalid-true-before': '',
        'aria-invalid-true-after': '',
        'aria-orientation-vertical-before': '',
        'aria-orientation-vertical-after': '',
        'aria-orientation-horizontal-before': '',
        'aria-orientation-horizontal-after': '',
        'aria-pressed-true-before': '',
        'aria-pressed-true-after': '',
        'aria-pressed-false-before': '',
        'aria-pressed-false-after': '',
        'aria-pressed-mixed-before': '',
        'aria-pressed-mixed-after': '',
        'aria-selected-true-before': '',
        'aria-selected-true-after': '',
        'aria-selected-false-before': '',
        'aria-selected-false-after': '',
        'aria-sort-ascending-before': '',
        'aria-sort-ascending-after': '',
        'aria-sort-descending-before': '',
        'aria-sort-descending-after': '',
        'aria-sort-other-before': '',
        'aria-sort-other-after': '',
        'aria-value-maximum-prefix-before': getBeforePreference(userPreferences,
                'aria-value-maximum-prefix', 'aria-value-position'),
        'aria-value-maximum-suffix-before': getBeforePreference(userPreferences,
                'aria-value-maximum-suffix', 'aria-value-position'),
        'aria-value-maximum-prefix-after': getAfterPreference(userPreferences,
                'aria-value-maximum-prefix', 'aria-value-position'),
        'aria-value-maximum-suffix-after': getAfterPreference(userPreferences,
                'aria-value-maximum-suffix', 'aria-value-position'),
        'aria-value-minimum-prefix-before': getBeforePreference(userPreferences,
                'aria-value-minimum-prefix', 'aria-value-position'),
        'aria-value-minimum-suffix-before': getBeforePreference(userPreferences,
                'aria-value-minimum-suffix', 'aria-value-position'),
        'aria-value-minimum-prefix-after': getAfterPreference(userPreferences,
                'aria-value-minimum-prefix', 'aria-value-position'),
        'aria-value-minimum-suffix-after': getAfterPreference(userPreferences,
                'aria-value-minimum-suffix', 'aria-value-position'),
        'attribute-accesskey-default':
                userPreferences['attribute-accesskey-default'],
        'attribute-accesskey-before': getBeforePreference(userPreferences,
                'attribute-accesskey', 'attribute-accesskey-page-position'),
        'attribute-accesskey-after': getAfterPreference(userPreferences,
                'attribute-accesskey', 'attribute-accesskey-page-position'),
        'attribute-accesskey-prefix-before':
                getBeforePreference(userPreferences,
                        'attribute-accesskey-prefix',
                        'attribute-accesskey-element-position'),
        'attribute-accesskey-suffix-before':
                getBeforePreference(userPreferences,
                        'attribute-accesskey-suffix',
                        'attribute-accesskey-element-position'),
        'attribute-accesskey-prefix-after': getAfterPreference(userPreferences,
                'attribute-accesskey-prefix',
                'attribute-accesskey-element-position'),
        'attribute-accesskey-suffix-after': getAfterPreference(userPreferences,
                'attribute-accesskey-suffix',
                'attribute-accesskey-element-position'),
        'attribute-download-before': getBeforePreference(userPreferences,
                'attribute-download', 'attribute-download-position'),
        'attribute-download-after': getAfterPreference(userPreferences,
                'attribute-download', 'attribute-download-position'),
        'attribute-draggable-before': getBeforePreference(userPreferences,
                'aria-grabbed-false', 'aria-grabbed-position'),
        'attribute-draggable-after': getAfterPreference(userPreferences,
                'aria-grabbed-false', 'aria-grabbed-position'),
        'attribute-dropzone-copy-before': getBeforePreference(userPreferences,
                'aria-dropeffect-copy', 'aria-dropeffect-position'),
        'attribute-dropzone-copy-after': getAfterPreference(userPreferences,
                'aria-dropeffect-copy', 'aria-dropeffect-position'),
        'attribute-dropzone-move-before': getBeforePreference(userPreferences,
                'aria-dropeffect-move', 'aria-dropeffect-position'),
        'attribute-dropzone-move-after': getAfterPreference(userPreferences,
                'aria-dropeffect-move', 'aria-dropeffect-position'),
        'attribute-dropzone-link-before': getBeforePreference(userPreferences,
                'aria-dropeffect-link', 'aria-dropeffect-position'),
        'attribute-dropzone-link-after': getAfterPreference(userPreferences,
                'aria-dropeffect-link', 'aria-dropeffect-position'),
        'attribute-language-prefix-before':
                userPreferences['attribute-language-prefix-before'],
        'attribute-language-suffix-before':
                userPreferences['attribute-language-suffix-before'],
        'attribute-language-prefix-after':
                userPreferences['attribute-language-prefix-after'],
        'attribute-language-suffix-after':
                userPreferences['attribute-language-suffix-after'],
        'attribute-role-prefix-before':
                userPreferences['attribute-role-prefix-before'],
        'attribute-role-suffix-before':
                userPreferences['attribute-role-suffix-before'],
        'attribute-role-prefix-after':
                userPreferences['attribute-role-prefix-after'],
        'attribute-role-suffix-after':
                userPreferences['attribute-role-suffix-after'],
        'elements-heading-before': getBeforePreference(userPreferences,
                'elements-heading', 'elements-heading-position'),
        'elements-heading-after': getAfterPreference(userPreferences,
                'elements-heading', 'elements-heading-position'),
        'skipper-main-content': userPreferences['skipper-main-content'],
        'skipper-shortcuts-list': userPreferences['skipper-shortcuts-list'],
        'skipper-table-contents': userPreferences['skipper-table-contents']
    };

    setSimpleAttributes(configuration, userPreferences);
    setLanguages(configuration);
    setRoles(configuration);

    return configuration;
}