function getFileContent(file, callback, identifier) {
    var request = new XMLHttpRequest();
    request.open('GET', chrome.extension.getURL(file), false);
    request.onreadystatechange = function() {
        if ((request.readyState === XMLHttpRequest.DONE)
                && (request.status === 200)) {
            callback(request.responseText, identifier);
        }
    };
    request.send();
}

function writeScript(content, identifier) {
    if (!document.getElementById(identifier)) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', identifier);
        script.appendChild(document.createTextNode(content));
        document.documentElement.appendChild(script);
    }
}

function loadScript(file, identifier) {
    getFileContent('scripts/' + file, writeScript, identifier);
}

function writeStyle(content, identifier) {
    if (!document.getElementById(identifier)) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', identifier);
        style.appendChild(document.createTextNode(content));
        document.documentElement.appendChild(style);
    }
}

function loadStyle(file, identifier) {
    getFileContent('styles/' + file, writeStyle, identifier);
}

function getConfiguration(callback) {
    chrome.storage.sync.get({
        'prefix-generated-ids': 'id-hatemile-browser-'
            + Math.random().toString(36).substring(7),
        'aria-autocomplete-both-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_both_before'),
        'aria-autocomplete-both-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_both_after'),
        'aria-autocomplete-inline-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_inline_before'),
        'aria-autocomplete-inline-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_inline_after'),
        'aria-autocomplete-list-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_list_before'),
        'aria-autocomplete-list-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_autocomplete_list_after'),
        'aria-busy-true-before': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_busy_true_before'),
        'aria-busy-true-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_busy_true_after'),
        'aria-checked-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_true_before'),
        'aria-checked-true-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_checked_true_after'),
        'aria-checked-false-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_false_before'),
        'aria-checked-false-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_false_after'),
        'aria-checked-mixed-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_mixed_before'),
        'aria-checked-mixed-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_checked_mixed_after'),
        'aria-dropeffect-copy-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_copy_before'),
        'aria-dropeffect-copy-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_copy_after'),
        'aria-dropeffect-move-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_move_before'),
        'aria-dropeffect-move-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_move_after'),
        'aria-dropeffect-link-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_link_before'),
        'aria-dropeffect-link-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_link_after'),
        'aria-dropeffect-execute-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_execute_before'),
        'aria-dropeffect-execute-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_execute_after'),
        'aria-dropeffect-popup-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_popup_before'),
        'aria-dropeffect-popup-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_dropeffect_popup_after'),
        'aria-expanded-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_true_before'),
        'aria-expanded-true-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_true_after'),
        'aria-expanded-false-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_false_before'),
        'aria-expanded-false-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_expanded_false_after'),
        'aria-grabbed-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_grabbed_true_before'),
        'aria-grabbed-true-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_grabbed_true_after'),
        'aria-grabbed-false-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_grabbed_false_before'),
        'aria-grabbed-false-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_grabbed_false_after'),
        'aria-haspopup-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_haspopup_true_before'),
        'aria-haspopup-true-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_haspopup_true_after'),
        'aria-invalid-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_invalid_true_before'),
        'aria-invalid-true-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_invalid_true_after'),
        'aria-label-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_label_prefix_before'),
        'aria-label-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_label_suffix_before'),
        'aria-label-prefix-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_label_prefix_after'),
        'aria-label-suffix-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_label_suffix_after'),
        'aria-level-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_level_prefix_before'),
        'aria-level-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_level_suffix_before'),
        'aria-level-prefix-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_level_prefix_after'),
        'aria-level-suffix-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_level_suffix_after'),
        'aria-orientation-vertical-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_orientation_vertical_before'),
        'aria-orientation-vertical-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_orientation_vertical_after'),
        'aria-orientation-horizontal-before': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_aria_orientation_horizontal_before'),
        'aria-orientation-horizontal-after': chrome.i18n.getMessage('extensions'
            + '_hatemile_aria_orientation_horizontal_after'),
        'aria-pressed-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_true_before'),
        'aria-pressed-true-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_pressed_true_after'),
        'aria-pressed-false-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_false_before'),
        'aria-pressed-false-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_false_after'),
        'aria-pressed-mixed-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_mixed_before'),
        'aria-pressed-mixed-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_pressed_mixed_after'),
        'aria-required-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_required_true_before'),
        'aria-required-true-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_required_true_after'),
        'aria-selected-true-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_true_before'),
        'aria-selected-true-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_true_after'),
        'aria-selected-false-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_false_before'),
        'aria-selected-false-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_selected_false_after'),
        'aria-sort-ascending-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_ascending_before'),
        'aria-sort-ascending-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_ascending_after'),
        'aria-sort-descending-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_descending_before'),
        'aria-sort-descending-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_sort_descending_after'),
        'aria-sort-other-before': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_sort_other_before'),
        'aria-sort-other-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'aria_sort_other_after'),
        'aria-value-maximum-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_prefix_before'),
        'aria-value-maximum-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_suffix_before'),
        'aria-value-maximum-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_prefix_after'),
        'aria-value-maximum-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_maximum_suffix_after'),
        'aria-value-minimum-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_prefix_before'),
        'aria-value-minimum-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_suffix_before'),
        'aria-value-minimum-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_prefix_after'),
        'aria-value-minimum-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_aria_value_minimum_suffix_after'),
        'attribute-title-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_prefix_before'),
        'attribute-title-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_suffix_before'),
        'attribute-title-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_prefix_after'),
        'attribute-title-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_title_suffix_after'),
        'attribute-accesskey-default': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_accesskey_default'),
        'attribute-accesskey-prefix-before': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_prefix_before'),
        'attribute-accesskey-suffix-before': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_suffix_before'),
        'attribute-accesskey-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_accesskey_prefix_after'),
        'attribute-accesskey-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_accesskey_suffix_after'),
        'attribute-target-blank-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_target_blank_before'),
        'attribute-target-blank-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_target_blank_after'),
        'attribute-download-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_download_before'),
        'attribute-download-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_download_after'),
        'attribute-draggable-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_draggable_before'),
        'attribute-draggable-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_draggable_after'),
        'attribute-dropzone-copy-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_copy_before'),
        'attribute-dropzone-copy-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_copy_after'),
        'attribute-dropzone-move-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_move_before'),
        'attribute-dropzone-move-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_move_after'),
        'attribute-dropzone-link-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_link_before'),
        'attribute-dropzone-link-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_dropzone_link_after'),
        'attribute-data-invalid-url-before': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_data_invalid_url_before'),
        'attribute-data-invalid-url-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_data_invalid_url_after'),
        'attribute-data-invalid-email-before': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_email_before'),
        'attribute-data-invalid-email-after': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_email_after'),
        'attribute-data-invalid-range-before': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_range_before'),
        'attribute-data-invalid-range-after': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_range_after'),
        'attribute-data-invalid-length-before': chrome.i18n.getMessage('extensi'
            + 'ons_hatemile_attribute_data_invalid_length_before'),
        'attribute-data-invalid-length-after': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_length_after'),
        'attribute-data-invalid-pattern-before': chrome.i18n.getMessage('extens'
            + 'ions_hatemile_attribute_data_invalid_pattern_before'),
        'attribute-data-invalid-pattern-after': chrome.i18n.getMessage('extensi'
            + 'ons_hatemile_attribute_data_invalid_pattern_after'),
        'attribute-data-invalid-required-before': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_data_invalid_required_before'),
        'attribute-data-invalid-required-after': chrome.i18n.getMessage('extens'
            + 'ions_hatemile_attribute_data_invalid_required_after'),
        'attribute-data-invalid-date-before': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_date_before'),
        'attribute-data-invalid-date-after': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_data_invalid_date_after'),
        'attribute-data-invalid-time-before': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_time_before'),
        'attribute-data-invalid-time-after': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_data_invalid_time_after'),
        'attribute-data-invalid-datetime-before': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_data_invalid_datetime_before'),
        'attribute-data-invalid-datetime-after': chrome.i18n.getMessage('extens'
            + 'ions_hatemile_attribute_data_invalid_datetime_after'),
        'attribute-data-invalid-month-before': chrome.i18n.getMessage('extensio'
            + 'ns_hatemile_attribute_data_invalid_month_before'),
        'attribute-data-invalid-month-after': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_month_after'),
        'attribute-data-invalid-week-before': chrome.i18n.getMessage('extension'
            + 's_hatemile_attribute_data_invalid_week_before'),
        'attribute-data-invalid-week-after': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_data_invalid_week_after'),
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
        'attribute-headers-prefix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_prefix_before'),
        'attribute-headers-suffix-before': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_suffix_before'),
        'attribute-headers-prefix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_prefix_after'),
        'attribute-headers-suffix-after': chrome.i18n.getMessage('extensions_'
            + 'hatemile_attribute_headers_suffix_after'),
        'attribute-longdescription-prefix-before': chrome.i18n.getMessage('exte'
            + 'nsions_hatemile_attribute_longdescription_prefix_before'),
        'attribute-longdescription-suffix-before': chrome.i18n.getMessage('exte'
            + 'nsions_hatemile_attribute_longdescription_suffix_before'),
        'attribute-longdescription-prefix-after': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_longdescription_prefix_after'),
        'attribute-longdescription-suffix-after': chrome.i18n.getMessage('exten'
            + 'sions_hatemile_attribute_longdescription_suffix_after'),
        'elements-heading-before': chrome.i18n.getMessage('extensions_hatemile_'
            + 'elements_heading_before'),
        'elements-heading-after': chrome.i18n.getMessage('extensions_hatemile_'
            + 'elements_heading_after'),
        'skipper-tableofcontents': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_tableofcontents')
    }, callback);
}
