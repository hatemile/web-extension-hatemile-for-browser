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

function getUserPreferences(callback) {
    var keys = {
        'aria-autocomplete-both': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_both'),
        'aria-autocomplete-inline': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_inline'),
        'aria-autocomplete-list': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_list'),
        'aria-busy-true': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_busy_true'),
        'aria-checked-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_true'),
        'aria-checked-false': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_false'),
        'aria-checked-mixed': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_mixed'),
        'aria-dropeffect-copy': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_copy'),
        'aria-dropeffect-move': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_move'),
        'aria-dropeffect-link': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_link'),
        'aria-dropeffect-execute': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_execute'),
        'aria-dropeffect-popup': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_popup'),
        'aria-expanded-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_true'),
        'aria-expanded-false': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_false'),
        'aria-grabbed-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_grabbed_true'),
        'aria-grabbed-false': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_grabbed_false'),
        'aria-haspopup-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_haspopup_true'),
        'aria-invalid-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_invalid_true'),
        'aria-level-prefix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_level_prefix'),
        'aria-level-suffix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_level_suffix'),
        'aria-orientation-vertical': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_orientation_vertical'),
        'aria-orientation-horizontal': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_aria_orientation_horizontal'),
        'aria-pressed-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_true'),
        'aria-pressed-false': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_false'),
        'aria-pressed-mixed': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_mixed'),
        'aria-required-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_required_true'),
        'aria-selected-true': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_true'),
        'aria-selected-false': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_false'),
        'aria-sort-ascending': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_ascending'),
        'aria-sort-descending': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_descending'),
        'aria-sort-other': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_sort_other'),
        'aria-value-maximum-prefix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_prefix'),
        'aria-value-maximum-suffix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_suffix'),
        'aria-value-minimum-prefix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_prefix'),
        'aria-value-minimum-suffix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_suffix'),
        'attribute-title-prefix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_prefix'),
        'attribute-title-suffix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_suffix'),
        'attribute-accesskey-default': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_accesskey_default'),
        'attribute-accesskey': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey'),
        'attribute-accesskey-prefix': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_prefix'),
        'attribute-accesskey-suffix': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_suffix'),
        'attribute-target-blank': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_target_blank'),
        'attribute-download': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_download'),
        'attribute-data-invalid-url': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_data_invalid_url'),
        'attribute-data-invalid-email': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_email'),
        'attribute-data-invalid-range': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_range'),
        'attribute-data-invalid-length': chrome.i18n.getMessage('extensi'
            + 'ons_hatemile_attribute_data_invalid_length'),
        'attribute-data-invalid-pattern': chrome.i18n.getMessage('extens'
            + 'ions_hatemile_attribute_data_invalid_pattern'),
        'attribute-data-invalid-required': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_data_invalid_required'),
        'attribute-data-invalid-date': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_date'),
        'attribute-data-invalid-time': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_time'),
        'attribute-data-invalid-datetime': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_data_invalid_datetime'),
        'attribute-data-invalid-month': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_month'),
        'attribute-data-invalid-week': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_week'),
        'attribute-language-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_language_prefix_before'),
        'attribute-language-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_language_suffix_before'),
        'attribute-language-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_language_prefix_after'),
        'attribute-language-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_language_suffix_after'),
        'attribute-role-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_role_prefix_before'),
        'attribute-role-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_role_suffix_before'),
        'attribute-role-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_role_prefix_after'),
        'attribute-role-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_role_suffix_after'),
        'attribute-headers-prefix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_prefix'),
        'attribute-headers-suffix': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_suffix'),
        'attribute-longdescription-prefix': chrome.i18n.getMessage('exte'
            + 'nsions_hatemile_attribute_longdescription_prefix'),
        'attribute-longdescription-suffix': chrome.i18n.getMessage('exte'
            + 'nsions_hatemile_attribute_longdescription_suffix'),
        'elements-heading': chrome.i18n.getMessage('extensions_hatemile_'
            + 'elements_heading'),
        'skipper-main-content': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_main_content'),
        'skipper-shortcuts-list': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_shortcuts_list'),
        'skipper-table-contents': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_table_contents'),
        'aria-autocomplete-position': DISPLAY_AFTER,
        'aria-busy-position': DISPLAY_BEFORE,
        'aria-checked-position': DISPLAY_AFTER,
        'aria-dropeffect-position': DISPLAY_AFTER,
        'aria-expanded-position': DISPLAY_AFTER,
        'aria-grabbed-position': DISPLAY_AFTER,
        'aria-haspopup-position': DISPLAY_AFTER,
        'aria-invalid-position': DISPLAY_AFTER,
        'aria-level-position': DISPLAY_BEFORE,
        'aria-orientation-position': DISPLAY_AFTER,
        'aria-pressed-position': DISPLAY_AFTER,
        'aria-required-position': DISPLAY_AFTER,
        'aria-selected-position': DISPLAY_AFTER,
        'aria-sort-position': DISPLAY_BEFORE,
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
        'aria-autocomplete-both-before': getBeforePreference(userPreferences,
                'aria-autocomplete-both', 'aria-autocomplete-position'),
        'aria-autocomplete-both-after': getAfterPreference(userPreferences,
                'aria-autocomplete-both', 'aria-autocomplete-position'),
        'aria-autocomplete-inline-before': getBeforePreference(userPreferences,
                'aria-autocomplete-inline', 'aria-autocomplete-position'),
        'aria-autocomplete-inline-after': getAfterPreference(userPreferences,
                'aria-autocomplete-inline', 'aria-autocomplete-position'),
        'aria-autocomplete-list-before': getBeforePreference(userPreferences,
                'aria-autocomplete-list', 'aria-autocomplete-position'),
        'aria-autocomplete-list-after': getAfterPreference(userPreferences,
                'aria-autocomplete-list', 'aria-autocomplete-position'),
        'aria-busy-true-before': getBeforePreference(userPreferences,
                'aria-busy-true', 'aria-busy-position'),
        'aria-busy-true-after': getAfterPreference(userPreferences,
                'aria-busy-true', 'aria-busy-position'),
        'aria-checked-true-before': getBeforePreference(userPreferences,
                'aria-checked-true', 'aria-checked-position'),
        'aria-checked-true-after': getAfterPreference(userPreferences,
                'aria-checked-true', 'aria-checked-position'),
        'aria-checked-false-before': getBeforePreference(userPreferences,
                'aria-checked-false', 'aria-checked-position'),
        'aria-checked-false-after': getAfterPreference(userPreferences,
                'aria-checked-false', 'aria-checked-position'),
        'aria-checked-mixed-before': getBeforePreference(userPreferences,
                'aria-checked-mixed', 'aria-checked-position'),
        'aria-checked-mixed-after': getAfterPreference(userPreferences,
                'aria-checked-mixed', 'aria-checked-position'),
        'aria-dropeffect-copy-before': getBeforePreference(userPreferences,
                'aria-dropeffect-copy', 'aria-dropeffect-position'),
        'aria-dropeffect-copy-after': getAfterPreference(userPreferences,
                'aria-dropeffect-copy', 'aria-dropeffect-position'),
        'aria-dropeffect-move-before': getBeforePreference(userPreferences,
                'aria-dropeffect-move', 'aria-dropeffect-position'),
        'aria-dropeffect-move-after': getAfterPreference(userPreferences,
                'aria-dropeffect-move', 'aria-dropeffect-position'),
        'aria-dropeffect-link-before': getBeforePreference(userPreferences,
                'aria-dropeffect-link', 'aria-dropeffect-position'),
        'aria-dropeffect-link-after': getAfterPreference(userPreferences,
                'aria-dropeffect-link', 'aria-dropeffect-position'),
        'aria-dropeffect-execute-before': getBeforePreference(userPreferences,
                'aria-dropeffect-execute', 'aria-dropeffect-position'),
        'aria-dropeffect-execute-after': getAfterPreference(userPreferences,
                'aria-dropeffect-execute', 'aria-dropeffect-position'),
        'aria-dropeffect-popup-before': getBeforePreference(userPreferences,
                'aria-dropeffect-popup', 'aria-dropeffect-position'),
        'aria-dropeffect-popup-after': getAfterPreference(userPreferences,
                'aria-dropeffect-popup', 'aria-dropeffect-position'),
        'aria-expanded-true-before': getBeforePreference(userPreferences,
                'aria-expanded-true', 'aria-expanded-position'),
        'aria-expanded-true-after': getAfterPreference(userPreferences,
                'aria-expanded-true', 'aria-expanded-position'),
        'aria-expanded-false-before': getBeforePreference(userPreferences,
                'aria-expanded-false', 'aria-expanded-position'),
        'aria-expanded-false-after': getAfterPreference(userPreferences,
                'aria-expanded-false', 'aria-expanded-position'),
        'aria-grabbed-true-before': getBeforePreference(userPreferences,
                'aria-grabbed-true', 'aria-grabbed-position'),
        'aria-grabbed-true-after': getAfterPreference(userPreferences,
                'aria-grabbed-true', 'aria-grabbed-position'),
        'aria-grabbed-false-before': getBeforePreference(userPreferences,
                'aria-grabbed-false', 'aria-grabbed-position'),
        'aria-grabbed-false-after': getAfterPreference(userPreferences,
                'aria-grabbed-false', 'aria-grabbed-position'),
        'aria-haspopup-true-before': getBeforePreference(userPreferences,
                'aria-haspopup-true', 'aria-haspopup-position'),
        'aria-haspopup-true-after': getAfterPreference(userPreferences,
                'aria-haspopup-true', 'aria-haspopup-position'),
        'aria-invalid-true-before': getBeforePreference(userPreferences,
                'aria-invalid-true', 'aria-invalid-position'),
        'aria-invalid-true-after': getAfterPreference(userPreferences,
                'aria-invalid-true', 'aria-invalid-position'),
        'aria-level-prefix-before': getBeforePreference(userPreferences,
                'aria-level-prefix', 'aria-level-position'),
        'aria-level-suffix-before': getBeforePreference(userPreferences,
                'aria-level-suffix', 'aria-level-position'),
        'aria-level-prefix-after': getAfterPreference(userPreferences,
                'aria-level-prefix', 'aria-level-position'),
        'aria-level-suffix-after': getAfterPreference(userPreferences,
                'aria-level-suffix', 'aria-level-position'),
        'aria-orientation-vertical-before': getBeforePreference(userPreferences,
                'aria-orientation-vertical', 'aria-orientation-position'),
        'aria-orientation-vertical-after': getAfterPreference(userPreferences,
                'aria-orientation-vertical', 'aria-orientation-position'),
        'aria-orientation-horizontal-before':
                getBeforePreference(userPreferences,
                        'aria-orientation-horizontal',
                        'aria-orientation-position'),
        'aria-orientation-horizontal-after': getAfterPreference(userPreferences,
                'aria-orientation-horizontal', 'aria-orientation-position'),
        'aria-pressed-true-before': getBeforePreference(userPreferences,
                'aria-pressed-true', 'aria-pressed-position'),
        'aria-pressed-true-after': getAfterPreference(userPreferences,
                'aria-pressed-true', 'aria-pressed-position'),
        'aria-pressed-false-before': getBeforePreference(userPreferences,
                'aria-pressed-false', 'aria-pressed-position'),
        'aria-pressed-false-after': getAfterPreference(userPreferences,
                'aria-pressed-false', 'aria-pressed-position'),
        'aria-pressed-mixed-before': getBeforePreference(userPreferences,
                'aria-pressed-mixed', 'aria-pressed-position'),
        'aria-pressed-mixed-after': getAfterPreference(userPreferences,
                'aria-pressed-mixed', 'aria-pressed-position'),
        'aria-required-true-before': getBeforePreference(userPreferences,
                'aria-required-true', 'aria-required-position'),
        'aria-required-true-after': getAfterPreference(userPreferences,
                'aria-required-true', 'aria-required-position'),
        'aria-selected-true-before': getBeforePreference(userPreferences,
                'aria-selected-true', 'aria-selected-position'),
        'aria-selected-true-after': getAfterPreference(userPreferences,
                'aria-selected-true', 'aria-selected-position'),
        'aria-selected-false-before': getBeforePreference(userPreferences,
                'aria-selected-false', 'aria-selected-position'),
        'aria-selected-false-after': getAfterPreference(userPreferences,
                'aria-selected-false', 'aria-selected-position'),
        'aria-sort-ascending-before': getBeforePreference(userPreferences,
                'aria-sort-ascending', 'aria-sort-position'),
        'aria-sort-ascending-after': getAfterPreference(userPreferences,
                'aria-sort-ascending', 'aria-sort-position'),
        'aria-sort-descending-before': getBeforePreference(userPreferences,
                'aria-sort-descending', 'aria-sort-position'),
        'aria-sort-descending-after': getAfterPreference(userPreferences,
                'aria-sort-descending', 'aria-sort-position'),
        'aria-sort-other-before': getBeforePreference(userPreferences,
                'aria-sort-other', 'aria-sort-position'),
        'aria-sort-other-after': getAfterPreference(userPreferences,
                'aria-sort-other', 'aria-sort-position'),
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
        'attribute-title-prefix-before': getBeforePreference(userPreferences,
                'attribute-title-prefix', 'attribute-title-position'),
        'attribute-title-suffix-before': getBeforePreference(userPreferences,
                'attribute-title-suffix', 'attribute-title-position'),
        'attribute-title-prefix-after': getAfterPreference(userPreferences,
                'attribute-title-prefix', 'attribute-title-position'),
        'attribute-title-suffix-after': getAfterPreference(userPreferences,
                'attribute-title-suffix', 'attribute-title-position'),
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
        'attribute-target-blank-before': getBeforePreference(userPreferences,
                'attribute-target-blank', 'attribute-target-position'),
        'attribute-target-blank-after': getAfterPreference(userPreferences,
                'attribute-target-blank', 'attribute-target-position'),
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
        'attribute-data-invalid-url-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-url',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-url-after': getAfterPreference(userPreferences,
                'attribute-data-invalid-url',
                'attribute-data-invalid-position'),
        'attribute-data-invalid-email-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-email',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-email-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-email',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-range-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-range',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-range-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-range',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-length-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-length',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-length-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-length',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-pattern-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-pattern',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-pattern-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-pattern',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-required-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-required',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-required-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-required',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-date-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-date',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-date-after': getAfterPreference(userPreferences,
                'attribute-data-invalid-date',
                'attribute-data-invalid-position'),
        'attribute-data-invalid-time-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-time',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-time-after': getAfterPreference(userPreferences,
                'attribute-data-invalid-time',
                'attribute-data-invalid-position'),
        'attribute-data-invalid-datetime-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-datetime',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-datetime-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-datetime',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-month-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-month',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-month-after':
                getAfterPreference(userPreferences,
                        'attribute-data-invalid-month',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-week-before':
                getBeforePreference(userPreferences,
                        'attribute-data-invalid-week',
                        'attribute-data-invalid-position'),
        'attribute-data-invalid-week-after': getAfterPreference(userPreferences,
                'attribute-data-invalid-week',
                'attribute-data-invalid-position'),
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
        'attribute-headers-prefix-before': getBeforePreference(userPreferences,
                'attribute-headers-prefix', 'attribute-headers-position'),
        'attribute-headers-suffix-before': getBeforePreference(userPreferences,
                'attribute-headers-suffix', 'attribute-headers-position'),
        'attribute-headers-prefix-after': getAfterPreference(userPreferences,
                'attribute-headers-prefix', 'attribute-headers-position'),
        'attribute-headers-suffix-after': getAfterPreference(userPreferences,
                'attribute-headers-suffix', 'attribute-headers-position'),
        'attribute-longdescription-prefix-before':
                getBeforePreference(userPreferences,
                        'attribute-longdescription-prefix',
                        'attribute-longdescription-position'),
        'attribute-longdescription-suffix-before':
                getBeforePreference(userPreferences,
                        'attribute-longdescription-suffix',
                        'attribute-longdescription-position'),
        'attribute-longdescription-prefix-after':
                getAfterPreference(userPreferences,
                        'attribute-longdescription-prefix',
                        'attribute-longdescription-position'),
        'attribute-longdescription-suffix-after':
                getAfterPreference(userPreferences,
                        'attribute-longdescription-suffix',
                        'attribute-longdescription-position'),
        'elements-heading-before': getBeforePreference(userPreferences,
                'elements-heading', 'elements-heading-position'),
        'elements-heading-after': getAfterPreference(userPreferences,
                'elements-heading', 'elements-heading-position'),
        'skipper-main-content': userPreferences['skipper-main-content'],
        'skipper-shortcuts-list': userPreferences['skipper-shortcuts-list'],
        'skipper-table-contents': userPreferences['skipper-table-contents']
    };

    setLanguages(configuration);
    setRoles(configuration);

    return configuration;
}