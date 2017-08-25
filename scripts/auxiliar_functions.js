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

function getAccessibleDisplayCSS(callback) {
	getFileContent('styles/accessibledisplay.mustache', function(content) {
		chrome.storage.sync.get({
			'aria-grabbed-true-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_true_before')
			, 'aria-grabbed-true-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_true_after')
			, 'aria-grabbed-false-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_before')
			, 'aria-grabbed-false-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_after')
			, 'aria-label-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_label_prefix_before')
			, 'aria-label-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_label_suffix_before')
			, 'aria-label-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_label_prefix_after')
			, 'aria-label-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_label_suffix_after')
			, 'aria-dropeffect-copy-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_before')
			, 'aria-dropeffect-copy-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_after')
			, 'aria-dropeffect-move-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_before')
			, 'aria-dropeffect-move-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_after')
			, 'aria-dropeffect-link-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_before')
			, 'aria-dropeffect-link-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_after')
			, 'aria-dropeffect-execute-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_execute_before')
			, 'aria-dropeffect-execute-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_execute_after')
			, 'aria-dropeffect-popup-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_popup_before')
			, 'aria-dropeffect-popup-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_popup_after')
			, 'attribute-download-before': chrome.i18n.getMessage('extensions_hatemile_attribute_download_before')
			, 'attribute-download-after': chrome.i18n.getMessage('extensions_hatemile_attribute_download_after')
			, 'attribute-target-blank-before': chrome.i18n.getMessage('extensions_hatemile_attribute_target_blank_before')
			, 'attribute-target-blank-after': chrome.i18n.getMessage('extensions_hatemile_attribute_target_blank_after')
			, 'attribute-title-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_before')
			, 'attribute-title-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_before')
			, 'attribute-title-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_after')
			, 'attribute-title-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_after')
			, 'attribute-accesskey-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_before')
			, 'attribute-accesskey-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_before')
			, 'attribute-accesskey-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_after')
			, 'attribute-accesskey-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_after')
			, 'attribute-draggable-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_before')
			, 'attribute-draggable-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_after')
			, 'attribute-dropzone-copy-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_before')
			, 'attribute-dropzone-copy-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_after')
			, 'attribute-dropzone-move-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_before')
			, 'attribute-dropzone-move-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_after')
			, 'attribute-dropzone-link-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_before')
			, 'attribute-dropzone-link-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_after')
		}, function(configuration) {
			callback(Mustache.render(content, configuration));
		});
	});
}

function getAccessibleFormDisplayCSS(callback) {
	getFileContent('styles/accessibleformdisplay.mustache', function(content) {
		chrome.storage.sync.get({
			'attribute-title-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_before')
			, 'attribute-title-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_before')
			, 'attribute-title-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_after')
			, 'attribute-title-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_after')
			, 'attribute-accesskey-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_before')
			, 'attribute-accesskey-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_before')
			, 'attribute-accesskey-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_after')
			, 'attribute-accesskey-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_after')
			, 'aria-required-true-before': chrome.i18n.getMessage('extensions_hatemile_aria_required_true_before')
			, 'aria-required-true-after': chrome.i18n.getMessage('extensions_hatemile_aria_required_true_after')
			, 'aria-value-maximum-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_prefix_before')
			, 'aria-value-maximum-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_suffix_before')
			, 'aria-value-maximum-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_prefix_after')
			, 'aria-value-maximum-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_suffix_after')
			, 'aria-value-minimum-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_prefix_before')
			, 'aria-value-minimum-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_suffix_before')
			, 'aria-value-minimum-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_prefix_after')
			, 'aria-value-minimum-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_suffix_after')
			, 'attribute-data-invalid-url-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_url_before')
			, 'attribute-data-invalid-url-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_url_after')
			, 'attribute-data-invalid-email-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_email_before')
			, 'attribute-data-invalid-email-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_email_after')
			, 'attribute-data-invalid-range-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_range_before')
			, 'attribute-data-invalid-range-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_range_after')
			, 'attribute-data-invalid-length-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_length_before')
			, 'attribute-data-invalid-length-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_length_after')
			, 'attribute-data-invalid-pattern-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_pattern_before')
			, 'attribute-data-invalid-pattern-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_pattern_after')
			, 'attribute-data-invalid-required-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_required_before')
			, 'attribute-data-invalid-required-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_required_after')
			, 'attribute-data-invalid-date-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_date_before')
			, 'attribute-data-invalid-date-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_date_after')
			, 'attribute-data-invalid-time-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_time_before')
			, 'attribute-data-invalid-time-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_time_after')
			, 'attribute-data-invalid-datetime-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_datetime_before')
			, 'attribute-data-invalid-datetime-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_datetime_after')
			, 'attribute-data-invalid-month-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_month_before')
			, 'attribute-data-invalid-month-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_month_after')
			, 'attribute-data-invalid-week-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_week_before')
			, 'attribute-data-invalid-week-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_week_after')
		}, function(configuration) {
			callback(Mustache.render(content, configuration));
		});
	});
}

function getConfiguration(callback) {
	chrome.storage.sync.get({
		'attribute-longdescription-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_prefix_before')
		, 'attribute-longdescription-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_suffix_before')
		, 'attribute-longdescription-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_prefix_after')
		, 'attribute-longdescription-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_suffix_after')
		, 'elements-heading-before': chrome.i18n.getMessage('extensions_hatemile_elements_heading_before')
		, 'elements-heading-after': chrome.i18n.getMessage('extensions_hatemile_elements_heading_after')
	}, callback);
}

function getSkippers(callback) {
	chrome.storage.sync.get({
		'skipper-tableofcontents': chrome.i18n.getMessage('extensions_hatemile_skipper_tableofcontents')
	}, callback);
}

function getAllPreferences(callback) {
	chrome.storage.sync.get({
		'aria-grabbed-true-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_true_before')
		, 'aria-grabbed-true-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_true_after')
		, 'aria-grabbed-false-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_before')
		, 'aria-grabbed-false-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_after')
		, 'aria-label-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_label_prefix_before')
		, 'aria-label-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_label_suffix_before')
		, 'aria-label-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_label_prefix_after')
		, 'aria-label-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_label_suffix_after')
		, 'aria-dropeffect-copy-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_before')
		, 'aria-dropeffect-copy-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_after')
		, 'aria-dropeffect-move-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_before')
		, 'aria-dropeffect-move-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_after')
		, 'aria-dropeffect-link-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_before')
		, 'aria-dropeffect-link-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_after')
		, 'aria-dropeffect-execute-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_execute_before')
		, 'aria-dropeffect-execute-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_execute_after')
		, 'aria-dropeffect-popup-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_popup_before')
		, 'aria-dropeffect-popup-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_popup_after')
		, 'attribute-download-before': chrome.i18n.getMessage('extensions_hatemile_attribute_download_before')
		, 'attribute-download-after': chrome.i18n.getMessage('extensions_hatemile_attribute_download_after')
		, 'attribute-target-blank-before': chrome.i18n.getMessage('extensions_hatemile_attribute_target_blank_before')
		, 'attribute-target-blank-after': chrome.i18n.getMessage('extensions_hatemile_attribute_target_blank_after')
		, 'attribute-title-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_before')
		, 'attribute-title-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_before')
		, 'attribute-title-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_prefix_after')
		, 'attribute-title-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_title_suffix_after')
		, 'attribute-accesskey-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_before')
		, 'attribute-accesskey-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_before')
		, 'attribute-accesskey-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_prefix_after')
		, 'attribute-accesskey-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_accesskey_suffix_after')
		, 'attribute-draggable-before': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_before')
		, 'attribute-draggable-after': chrome.i18n.getMessage('extensions_hatemile_aria_grabbed_false_after')
		, 'attribute-dropzone-copy-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_before')
		, 'attribute-dropzone-copy-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_copy_after')
		, 'attribute-dropzone-move-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_before')
		, 'attribute-dropzone-move-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_move_after')
		, 'attribute-dropzone-link-before': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_before')
		, 'attribute-dropzone-link-after': chrome.i18n.getMessage('extensions_hatemile_aria_dropeffect_link_after')
		, 'aria-required-true-before': chrome.i18n.getMessage('extensions_hatemile_aria_required_true_before')
		, 'aria-required-true-after': chrome.i18n.getMessage('extensions_hatemile_aria_required_true_after')
		, 'aria-value-maximum-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_prefix_before')
		, 'aria-value-maximum-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_suffix_before')
		, 'aria-value-maximum-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_prefix_after')
		, 'aria-value-maximum-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_maximum_suffix_after')
		, 'aria-value-minimum-prefix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_prefix_before')
		, 'aria-value-minimum-suffix-before': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_suffix_before')
		, 'aria-value-minimum-prefix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_prefix_after')
		, 'aria-value-minimum-suffix-after': chrome.i18n.getMessage('extensions_hatemile_aria_value_minimum_suffix_after')
		, 'attribute-data-invalid-url-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_url_before')
		, 'attribute-data-invalid-url-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_url_after')
		, 'attribute-data-invalid-email-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_email_before')
		, 'attribute-data-invalid-email-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_email_after')
		, 'attribute-data-invalid-range-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_range_before')
		, 'attribute-data-invalid-range-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_range_after')
		, 'attribute-data-invalid-length-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_length_before')
		, 'attribute-data-invalid-length-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_length_after')
		, 'attribute-data-invalid-pattern-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_pattern_before')
		, 'attribute-data-invalid-pattern-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_pattern_after')
		, 'attribute-data-invalid-required-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_required_before')
		, 'attribute-data-invalid-required-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_required_after')
		, 'attribute-data-invalid-date-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_date_before')
		, 'attribute-data-invalid-date-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_date_after')
		, 'attribute-data-invalid-time-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_time_before')
		, 'attribute-data-invalid-time-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_time_after')
		, 'attribute-data-invalid-datetime-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_datetime_before')
		, 'attribute-data-invalid-datetime-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_datetime_after')
		, 'attribute-data-invalid-month-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_month_before')
		, 'attribute-data-invalid-month-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_month_after')
		, 'attribute-data-invalid-week-before': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_week_before')
		, 'attribute-data-invalid-week-after': chrome.i18n.getMessage('extensions_hatemile_attribute_data_invalid_week_after')
		, 'attribute-longdescription-prefix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_prefix_before')
		, 'attribute-longdescription-suffix-before': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_suffix_before')
		, 'attribute-longdescription-prefix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_prefix_after')
		, 'attribute-longdescription-suffix-after': chrome.i18n.getMessage('extensions_hatemile_attribute_longdescription_suffix_after')
		, 'elements-heading-before': chrome.i18n.getMessage('extensions_hatemile_elements_heading_before')
		, 'elements-heading-after': chrome.i18n.getMessage('extensions_hatemile_elements_heading_after')
		, 'skipper-tableofcontents': chrome.i18n.getMessage('extensions_hatemile_skipper_tableofcontents')
	}, callback);
}