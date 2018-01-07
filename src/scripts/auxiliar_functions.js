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

function getConfiguration(callback) {
    var keys = {
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
        'attribute-accesskey-before': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_before'),
        'attribute-accesskey-after': chrome.i18n.getMessage('extensions'
            + '_hatemile_attribute_accesskey_after'),
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
        'skipper-main-content': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_main_content'),
        'skipper-shortcuts-list': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_shortcuts_list'),
        'skipper-table-contents': chrome.i18n.getMessage('extensions_hatemile_'
            + 'skipper_table_contents')
    };
    if ((typeof browser !== typeof undefined) && (browser.storage) &&
            (browser.storage.local) && (browser.storage.local.get)) {
        var settings = browser.storage.local.get(keys);
        settings.then(callback, function () {});
    } else {
        chrome.storage.sync.get(keys, callback);
    }
}

function loadReadOnlyConfiguration(configuration) {
    var readOnlyConfiguration = {
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
                .getMessage('extensions_hatemile_language_zu')
    };

    for (var key in readOnlyConfiguration) {
        configuration[key] = readOnlyConfiguration[key];
    }
}