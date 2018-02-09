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
    return {
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
        'skipper-table-contents': userPreferences['skipper-table-contents'],
        'language-aa': chrome.i18n
                .getMessage('extensions_hatemile_language_aa'),
        'language-ab': chrome.i18n
                .getMessage('extensions_hatemile_language_ab'),
        'language-ae': chrome.i18n
                .getMessage('extensions_hatemile_language_ae'),
        'language-af': chrome.i18n
                .getMessage('extensions_hatemile_language_af'),
        'language-ak': chrome.i18n
                .getMessage('extensions_hatemile_language_ak'),
        'language-am': chrome.i18n
                .getMessage('extensions_hatemile_language_am'),
        'language-an': chrome.i18n
                .getMessage('extensions_hatemile_language_an'),
        'language-ar': chrome.i18n
                .getMessage('extensions_hatemile_language_ar'),
        'language-as': chrome.i18n
                .getMessage('extensions_hatemile_language_as'),
        'language-av': chrome.i18n
                .getMessage('extensions_hatemile_language_av'),
        'language-ay': chrome.i18n
                .getMessage('extensions_hatemile_language_ay'),
        'language-az': chrome.i18n
                .getMessage('extensions_hatemile_language_az'),
        'language-ba': chrome.i18n
                .getMessage('extensions_hatemile_language_ba'),
        'language-be': chrome.i18n
                .getMessage('extensions_hatemile_language_be'),
        'language-bg': chrome.i18n
                .getMessage('extensions_hatemile_language_bg'),
        'language-bh': chrome.i18n
                .getMessage('extensions_hatemile_language_bh'),
        'language-bi': chrome.i18n
                .getMessage('extensions_hatemile_language_bi'),
        'language-bm': chrome.i18n
                .getMessage('extensions_hatemile_language_bm'),
        'language-bn': chrome
                .i18n.getMessage('extensions_hatemile_language_bn'),
        'language-bo': chrome.i18n
                .getMessage('extensions_hatemile_language_bo'),
        'language-br': chrome.i18n
                .getMessage('extensions_hatemile_language_br'),
        'language-bs': chrome.i18n
                .getMessage('extensions_hatemile_language_bs'),
        'language-ca': chrome.i18n
                .getMessage('extensions_hatemile_language_ca'),
        'language-ce': chrome.i18n
                .getMessage('extensions_hatemile_language_ce'),
        'language-ch': chrome.i18n
                .getMessage('extensions_hatemile_language_ch'),
        'language-co': chrome.i18n
                .getMessage('extensions_hatemile_language_co'),
        'language-cr': chrome.i18n
                .getMessage('extensions_hatemile_language_cr'),
        'language-cs': chrome.i18n
                .getMessage('extensions_hatemile_language_cs'),
        'language-cu': chrome.i18n
                .getMessage('extensions_hatemile_language_cu'),
        'language-cv': chrome.i18n
                .getMessage('extensions_hatemile_language_cv'),
        'language-cy': chrome.i18n
                .getMessage('extensions_hatemile_language_cy'),
        'language-da': chrome.i18n
                .getMessage('extensions_hatemile_language_da'),
        'language-de': chrome.i18n
                .getMessage('extensions_hatemile_language_de'),
        'language-dv': chrome.i18n
                .getMessage('extensions_hatemile_language_dv'),
        'language-dz': chrome.i18n
                .getMessage('extensions_hatemile_language_dz'),
        'language-ee': chrome.i18n
                .getMessage('extensions_hatemile_language_ee'),
        'language-el': chrome.i18n
                .getMessage('extensions_hatemile_language_el'),
        'language-en': chrome.i18n
                .getMessage('extensions_hatemile_language_en'),
        'language-eo': chrome.i18n
                .getMessage('extensions_hatemile_language_eo'),
        'language-es': chrome.i18n
                .getMessage('extensions_hatemile_language_es'),
        'language-et': chrome.i18n
                .getMessage('extensions_hatemile_language_et'),
        'language-eu': chrome.i18n
                .getMessage('extensions_hatemile_language_eu'),
        'language-fa': chrome.i18n
                .getMessage('extensions_hatemile_language_fa'),
        'language-ff': chrome.i18n
                .getMessage('extensions_hatemile_language_ff'),
        'language-fi': chrome.i18n
                .getMessage('extensions_hatemile_language_fi'),
        'language-fj': chrome.i18n
                .getMessage('extensions_hatemile_language_fj'),
        'language-fo': chrome.i18n
                .getMessage('extensions_hatemile_language_fo'),
        'language-fr': chrome.i18n
                .getMessage('extensions_hatemile_language_fr'),
        'language-fy': chrome.i18n
                .getMessage('extensions_hatemile_language_fy'),
        'language-ga': chrome.i18n
                .getMessage('extensions_hatemile_language_ga'),
        'language-gd': chrome.i18n
                .getMessage('extensions_hatemile_language_gd'),
        'language-gl': chrome.i18n
                .getMessage('extensions_hatemile_language_gl'),
        'language-gn': chrome.i18n
                .getMessage('extensions_hatemile_language_gn'),
        'language-gu': chrome.i18n
                .getMessage('extensions_hatemile_language_gu'),
        'language-gv': chrome.i18n
                .getMessage('extensions_hatemile_language_gv'),
        'language-ha': chrome.i18n
                .getMessage('extensions_hatemile_language_ha'),
        'language-he': chrome.i18n
                .getMessage('extensions_hatemile_language_he'),
        'language-hi': chrome.i18n
                .getMessage('extensions_hatemile_language_hi'),
        'language-ho': chrome.i18n
                .getMessage('extensions_hatemile_language_ho'),
        'language-hr': chrome.i18n
                .getMessage('extensions_hatemile_language_hr'),
        'language-ht': chrome.i18n
                .getMessage('extensions_hatemile_language_ht'),
        'language-hu': chrome.i18n
                .getMessage('extensions_hatemile_language_hu'),
        'language-hy': chrome.i18n
                .getMessage('extensions_hatemile_language_hy'),
        'language-hz': chrome.i18n
                .getMessage('extensions_hatemile_language_hz'),
        'language-ia': chrome.i18n
                .getMessage('extensions_hatemile_language_ia'),
        'language-id': chrome.i18n
                .getMessage('extensions_hatemile_language_id'),
        'language-ie': chrome.i18n
                .getMessage('extensions_hatemile_language_ie'),
        'language-ig': chrome.i18n
                .getMessage('extensions_hatemile_language_ig'),
        'language-ii': chrome.i18n
                .getMessage('extensions_hatemile_language_ii'),
        'language-ik': chrome.i18n
                .getMessage('extensions_hatemile_language_ik'),
        'language-io': chrome.i18n
                .getMessage('extensions_hatemile_language_io'),
        'language-is': chrome.i18n
                .getMessage('extensions_hatemile_language_is'),
        'language-it': chrome.i18n
                .getMessage('extensions_hatemile_language_it'),
        'language-iu': chrome.i18n
                .getMessage('extensions_hatemile_language_iu'),
        'language-ja': chrome.i18n
                .getMessage('extensions_hatemile_language_ja'),
        'language-jv': chrome.i18n
                .getMessage('extensions_hatemile_language_jv'),
        'language-ka': chrome.i18n
                .getMessage('extensions_hatemile_language_ka'),
        'language-kg': chrome.i18n
                .getMessage('extensions_hatemile_language_kg'),
        'language-ki': chrome.i18n
                .getMessage('extensions_hatemile_language_ki'),
        'language-kj': chrome.i18n
                .getMessage('extensions_hatemile_language_kj'),
        'language-kk': chrome.i18n
                .getMessage('extensions_hatemile_language_kk'),
        'language-kl': chrome.i18n
                .getMessage('extensions_hatemile_language_kl'),
        'language-km': chrome.i18n
                .getMessage('extensions_hatemile_language_km'),
        'language-kn': chrome.i18n
                .getMessage('extensions_hatemile_language_kn'),
        'language-ko': chrome.i18n
                .getMessage('extensions_hatemile_language_ko'),
        'language-kr': chrome.i18n
                .getMessage('extensions_hatemile_language_kr'),
        'language-ks': chrome.i18n
                .getMessage('extensions_hatemile_language_ks'),
        'language-ku': chrome.i18n
                .getMessage('extensions_hatemile_language_ku'),
        'language-kv': chrome.i18n
                .getMessage('extensions_hatemile_language_kv'),
        'language-kw': chrome.i18n
                .getMessage('extensions_hatemile_language_kw'),
        'language-ky': chrome.i18n
                .getMessage('extensions_hatemile_language_ky'),
        'language-la': chrome.i18n
                .getMessage('extensions_hatemile_language_la'),
        'language-lb': chrome.i18n
                .getMessage('extensions_hatemile_language_lb'),
        'language-lg': chrome.i18n
                .getMessage('extensions_hatemile_language_lg'),
        'language-li': chrome.i18n
                .getMessage('extensions_hatemile_language_li'),
        'language-ln': chrome.i18n
                .getMessage('extensions_hatemile_language_ln'),
        'language-lo': chrome.i18n
                .getMessage('extensions_hatemile_language_lo'),
        'language-lt': chrome.i18n
                .getMessage('extensions_hatemile_language_lt'),
        'language-lu': chrome.i18n
                .getMessage('extensions_hatemile_language_lu'),
        'language-lv': chrome.i18n
                .getMessage('extensions_hatemile_language_lv'),
        'language-mg': chrome.i18n
                .getMessage('extensions_hatemile_language_mg'),
        'language-mh': chrome.i18n
                .getMessage('extensions_hatemile_language_mh'),
        'language-mi': chrome.i18n
                .getMessage('extensions_hatemile_language_mi'),
        'language-mk': chrome.i18n
                .getMessage('extensions_hatemile_language_mk'),
        'language-ml': chrome.i18n
                .getMessage('extensions_hatemile_language_ml'),
        'language-mn': chrome.i18n
                .getMessage('extensions_hatemile_language_mn'),
        'language-mr': chrome.i18n
                .getMessage('extensions_hatemile_language_mr'),
        'language-ms': chrome.i18n
                .getMessage('extensions_hatemile_language_ms'),
        'language-mt': chrome.i18n
                .getMessage('extensions_hatemile_language_mt'),
        'language-my': chrome.i18n
                .getMessage('extensions_hatemile_language_my'),
        'language-na': chrome.i18n
                .getMessage('extensions_hatemile_language_na'),
        'language-nb': chrome.i18n
                .getMessage('extensions_hatemile_language_nb'),
        'language-nd': chrome.i18n
                .getMessage('extensions_hatemile_language_nd'),
        'language-ne': chrome.i18n
                .getMessage('extensions_hatemile_language_ne'),
        'language-ng': chrome.i18n
                .getMessage('extensions_hatemile_language_ng'),
        'language-nl': chrome.i18n
                .getMessage('extensions_hatemile_language_nl'),
        'language-nn': chrome.i18n
                .getMessage('extensions_hatemile_language_nn'),
        'language-no': chrome.i18n
                .getMessage('extensions_hatemile_language_no'),
        'language-nr': chrome.i18n
                .getMessage('extensions_hatemile_language_nr'),
        'language-nv': chrome.i18n
                .getMessage('extensions_hatemile_language_nv'),
        'language-ny': chrome.i18n
                .getMessage('extensions_hatemile_language_ny'),
        'language-oc': chrome.i18n
                .getMessage('extensions_hatemile_language_oc'),
        'language-oj': chrome.i18n
                .getMessage('extensions_hatemile_language_oj'),
        'language-om': chrome.i18n
                .getMessage('extensions_hatemile_language_om'),
        'language-or': chrome.i18n
                .getMessage('extensions_hatemile_language_or'),
        'language-os': chrome.i18n
                .getMessage('extensions_hatemile_language_os'),
        'language-pa': chrome.i18n
                .getMessage('extensions_hatemile_language_pa'),
        'language-pi': chrome.i18n
                .getMessage('extensions_hatemile_language_pi'),
        'language-pl': chrome.i18n
                .getMessage('extensions_hatemile_language_pl'),
        'language-ps': chrome.i18n
                .getMessage('extensions_hatemile_language_ps'),
        'language-pt': chrome.i18n
                .getMessage('extensions_hatemile_language_pt'),
        'language-qu': chrome.i18n
                .getMessage('extensions_hatemile_language_qu'),
        'language-rm': chrome.i18n
                .getMessage('extensions_hatemile_language_rm'),
        'language-rn': chrome.i18n
                .getMessage('extensions_hatemile_language_rn'),
        'language-ro': chrome.i18n
                .getMessage('extensions_hatemile_language_ro'),
        'language-ru': chrome.i18n
                .getMessage('extensions_hatemile_language_ru'),
        'language-rw': chrome.i18n
                .getMessage('extensions_hatemile_language_rw'),
        'language-sa': chrome.i18n
                .getMessage('extensions_hatemile_language_sa'),
        'language-sc': chrome.i18n
                .getMessage('extensions_hatemile_language_sc'),
        'language-sd': chrome.i18n
                .getMessage('extensions_hatemile_language_sd'),
        'language-se': chrome.i18n
                .getMessage('extensions_hatemile_language_se'),
        'language-sg': chrome.i18n
                .getMessage('extensions_hatemile_language_sg'),
        'language-si': chrome.i18n
                .getMessage('extensions_hatemile_language_si'),
        'language-sk': chrome.i18n
                .getMessage('extensions_hatemile_language_sk'),
        'language-sl': chrome.i18n
                .getMessage('extensions_hatemile_language_sl'),
        'language-sm': chrome.i18n
                .getMessage('extensions_hatemile_language_sm'),
        'language-sn': chrome.i18n
                .getMessage('extensions_hatemile_language_sn'),
        'language-so': chrome.i18n
                .getMessage('extensions_hatemile_language_so'),
        'language-sq': chrome.i18n
                .getMessage('extensions_hatemile_language_sq'),
        'language-sr': chrome.i18n
                .getMessage('extensions_hatemile_language_sr'),
        'language-ss': chrome.i18n
                .getMessage('extensions_hatemile_language_ss'),
        'language-st': chrome.i18n
                .getMessage('extensions_hatemile_language_st'),
        'language-su': chrome.i18n
                .getMessage('extensions_hatemile_language_su'),
        'language-sv': chrome.i18n
                .getMessage('extensions_hatemile_language_sv'),
        'language-sw': chrome.i18n
                .getMessage('extensions_hatemile_language_sw'),
        'language-ta': chrome.i18n
                .getMessage('extensions_hatemile_language_ta'),
        'language-te': chrome.i18n
                .getMessage('extensions_hatemile_language_te'),
        'language-tg': chrome.i18n
                .getMessage('extensions_hatemile_language_tg'),
        'language-th': chrome.i18n
                .getMessage('extensions_hatemile_language_th'),
        'language-ti': chrome.i18n
                .getMessage('extensions_hatemile_language_ti'),
        'language-tk': chrome.i18n
                .getMessage('extensions_hatemile_language_tk'),
        'language-tl': chrome.i18n
                .getMessage('extensions_hatemile_language_tl'),
        'language-tn': chrome.i18n
                .getMessage('extensions_hatemile_language_tn'),
        'language-to': chrome.i18n
                .getMessage('extensions_hatemile_language_to'),
        'language-tr': chrome.i18n
                .getMessage('extensions_hatemile_language_tr'),
        'language-ts': chrome.i18n
                .getMessage('extensions_hatemile_language_ts'),
        'language-tt': chrome.i18n
                .getMessage('extensions_hatemile_language_tt'),
        'language-tw': chrome.i18n
                .getMessage('extensions_hatemile_language_tw'),
        'language-ty': chrome.i18n
                .getMessage('extensions_hatemile_language_ty'),
        'language-ug': chrome.i18n
                .getMessage('extensions_hatemile_language_ug'),
        'language-uk': chrome.i18n
                .getMessage('extensions_hatemile_language_uk'),
        'language-ur': chrome.i18n
                .getMessage('extensions_hatemile_language_ur'),
        'language-uz': chrome.i18n
                .getMessage('extensions_hatemile_language_uz'),
        'language-ve': chrome.i18n
                .getMessage('extensions_hatemile_language_ve'),
        'language-vi': chrome.i18n
                .getMessage('extensions_hatemile_language_vi'),
        'language-vo': chrome.i18n
                .getMessage('extensions_hatemile_language_vo'),
        'language-wa': chrome.i18n
                .getMessage('extensions_hatemile_language_wa'),
        'language-wo': chrome.i18n
                .getMessage('extensions_hatemile_language_wo'),
        'language-xh': chrome.i18n
                .getMessage('extensions_hatemile_language_xh'),
        'language-yi': chrome.i18n
                .getMessage('extensions_hatemile_language_yi'),
        'language-yo': chrome.i18n
                .getMessage('extensions_hatemile_language_yo'),
        'language-za': chrome.i18n
                .getMessage('extensions_hatemile_language_za'),
        'language-zh': chrome.i18n
                .getMessage('extensions_hatemile_language_zh'),
        'language-zu': chrome.i18n
                .getMessage('extensions_hatemile_language_zu'),
        'role-alert': chrome.i18n.getMessage('extensions_hatemile_role_alert'),
        'role-alertdialog': chrome.i18n
                .getMessage('extensions_hatemile_role_alertdialog'),
        'role-application': chrome.i18n
                .getMessage('extensions_hatemile_role_application'),
        'role-article': chrome.i18n
                .getMessage('extensions_hatemile_role_article'),
        'role-banner': chrome.i18n
                .getMessage('extensions_hatemile_role_banner'),
        'role-button': chrome.i18n
                .getMessage('extensions_hatemile_role_button'),
        'role-checkbox': chrome.i18n
                .getMessage('extensions_hatemile_role_checkbox'),
        'role-columnheader': chrome.i18n
                .getMessage('extensions_hatemile_role_columnheader'),
        'role-combobox': chrome.i18n
                .getMessage('extensions_hatemile_role_combobox'),
        'role-complementary': chrome.i18n
                .getMessage('extensions_hatemile_role_complementary'),
        'role-contentinfo': chrome.i18n
                .getMessage('extensions_hatemile_role_contentinfo'),
        'role-definition': chrome.i18n
                .getMessage('extensions_hatemile_role_definition'),
        'role-dialog': chrome.i18n
                .getMessage('extensions_hatemile_role_dialog'),
        'role-directory': chrome.i18n
                .getMessage('extensions_hatemile_role_directory'),
        'role-document': chrome.i18n
                .getMessage('extensions_hatemile_role_document'),
        'role-form': chrome.i18n.getMessage('extensions_hatemile_role_form'),
        'role-grid': chrome.i18n.getMessage('extensions_hatemile_role_grid'),
        'role-gridcell': chrome.i18n
                .getMessage('extensions_hatemile_role_gridcell'),
        'role-group': chrome.i18n.getMessage('extensions_hatemile_role_group'),
        'role-heading': chrome.i18n
                .getMessage('extensions_hatemile_role_heading'),
        'role-img': chrome.i18n.getMessage('extensions_hatemile_role_img'),
        'role-link': chrome.i18n.getMessage('extensions_hatemile_role_link'),
        'role-list': chrome.i18n.getMessage('extensions_hatemile_role_list'),
        'role-listbox': chrome.i18n
                .getMessage('extensions_hatemile_role_listbox'),
        'role-listitem': chrome.i18n
                .getMessage('extensions_hatemile_role_listitem'),
        'role-log': chrome.i18n.getMessage('extensions_hatemile_role_log'),
        'role-main': chrome.i18n.getMessage('extensions_hatemile_role_main'),
        'role-marquee': chrome.i18n
                .getMessage('extensions_hatemile_role_marquee'),
        'role-math': chrome.i18n.getMessage('extensions_hatemile_role_math'),
        'role-menu': chrome.i18n.getMessage('extensions_hatemile_role_menu'),
        'role-menubar': chrome.i18n
                .getMessage('extensions_hatemile_role_menubar'),
        'role-menuitem': chrome.i18n
                .getMessage('extensions_hatemile_role_menuitem'),
        'role-menuitemcheckbox': chrome.i18n
                .getMessage('extensions_hatemile_role_menuitemcheckbox'),
        'role-menuitemradio': chrome.i18n
                .getMessage('extensions_hatemile_role_menuitemradio'),
        'role-navigation': chrome.i18n
                .getMessage('extensions_hatemile_role_navigation'),
        'role-note': chrome.i18n.getMessage('extensions_hatemile_role_note'),
        'role-option': chrome.i18n
                .getMessage('extensions_hatemile_role_option'),
        'role-progressbar': chrome.i18n
                .getMessage('extensions_hatemile_role_progressbar'),
        'role-radio': chrome.i18n.getMessage('extensions_hatemile_role_radio'),
        'role-radiogroup': chrome.i18n
                .getMessage('extensions_hatemile_role_radiogroup'),
        'role-region': chrome.i18n
                .getMessage('extensions_hatemile_role_region'),
        'role-row': chrome.i18n.getMessage('extensions_hatemile_role_row'),
        'role-rowgroup': chrome.i18n
                .getMessage('extensions_hatemile_role_rowgroup'),
        'role-rowheader': chrome.i18n
                .getMessage('extensions_hatemile_role_rowheader'),
        'role-scrollbar': chrome.i18n
                .getMessage('extensions_hatemile_role_scrollbar'),
        'role-search': chrome.i18n
                .getMessage('extensions_hatemile_role_search'),
        'role-separator': chrome.i18n
                .getMessage('extensions_hatemile_role_separator'),
        'role-slider': chrome.i18n
                .getMessage('extensions_hatemile_role_slider'),
        'role-spinbutton': chrome.i18n
                .getMessage('extensions_hatemile_role_spinbutton'),
        'role-status': chrome.i18n
                .getMessage('extensions_hatemile_role_status'),
        'role-tab': chrome.i18n.getMessage('extensions_hatemile_role_tab'),
        'role-tablist': chrome.i18n
                .getMessage('extensions_hatemile_role_tablist'),
        'role-tabpanel': chrome.i18n
                .getMessage('extensions_hatemile_role_tabpanel'),
        'role-textbox': chrome.i18n
                .getMessage('extensions_hatemile_role_textbox'),
        'role-timer': chrome.i18n.getMessage('extensions_hatemile_role_timer'),
        'role-toolbar': chrome.i18n
                .getMessage('extensions_hatemile_role_toolbar'),
        'role-tooltip': chrome.i18n
                .getMessage('extensions_hatemile_role_tooltip'),
        'role-tree': chrome.i18n.getMessage('extensions_hatemile_role_tree'),
        'role-treegrid': chrome.i18n
                .getMessage('extensions_hatemile_role_treegrid'),
        'role-treeitem': chrome.i18n
                .getMessage('extensions_hatemile_role_treeitem')
    };
}