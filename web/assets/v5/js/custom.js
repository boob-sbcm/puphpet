var PUPHPET = {};

/**
 * When element is clicked, update another element.
 *
 * This is good for:
 *
 * 1. User clicks element, user prompted for input, element properties + user input
 *      used to update another element
 * 2. Clicking one element checks another element if target is a radio or checkbox
 *
 * Loops through all data-* type attributes of element
 */
PUPHPET.updateOtherInput = function() {
    $(document).on('click', '.update-other-input', function(e){
        var $parent = $(this);

        $.each($(this).data(), function(key, value) {
            // jQuery changed "data-foo-bar" to "dataFooBar". Change them back.
            key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

            // Only work with data attributes that have "update-"
            if (key.search('update-') !== 0) {
                return true;
            }

            key = key.replace('update-', '');

            var $target = $('#' + key);

            // If target element is not defined as #foo, maybe it is an input,name,value target
            if (!$target.length) {
                var selector = 'input[name="' + key + '"]';

                if (value.length) {
                    selector = selector + '[value="'+ value +'"]'
                }

                $target = $(selector)
            }

            // If target is a radio element, check it, no need to uncheck in future
            if ($target.is(':radio')) {
                $target.prop('checked', true);

                return true;
            }

            /**
             * If target is checkbox element, check if clicked element was checked or unchecked.
             *
             * If unchecked, do not update target. We only want to handle positive actions
             */
            if ($target.is(':checkbox')) {
                var checked;

                // Element gets checked, wants target to be checked
                if (value && $parent.is(':checked')) {
                    checked = true;
                }
                // Element gets checked, wants target to be unchecked
                else if (!value && $parent.is(':checked')) {
                    checked = false;
                }
                // Element gets unchecked
                else {
                    return 1;
                }

                $target.prop('checked', checked);

                return true;
            }

            if (!$target.is(':radio') && !$target.is(':checkbox')) {
                $target.val(value);
            }
        });
    });
};

/**
 * When a <select> element is chosen, check another element.
 *
 * For example, choosing Debian 6 will auto-select PHP 5.4, as 5.5 is not supported.
 */
PUPHPET.updateOtherInputSelect = function() {
    $(document).on('change', 'select.update-other-input', function(e){
        var $parent = $(this);

        $('select.update-other-input option:selected').each(function() {
            $.each($(this).data(), function(key, value) {
                // jQuery changed "data-foo-bar" to "dataFooBar". Change them back.
                key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

                // Only work with data attributes that have "update-"
                if (key.search('update-') !== 0) {
                    return;
                }

                key = key.replace('update-', '');

                var $target = $('#' + key);

                // If target element is not defined as #foo, maybe it is an input,name,value target
                if (!$target.length) {
                    $target = $('input[name="' + key + '"][value="'+ value +'"]')
                }

                // If target is a radio element, check it, no need to uncheck in future
                if ($target.is(':radio')) {
                    $target.prop('checked', true);

                    return;
                }

                /**
                 * If target is checkbox element, check if clicked element was checked or unchecked.
                 *
                 * If unchecked, do not update target. We only want to handle positive actions
                 */
                if ($target.is(':checkbox') && $parent.is(':checked')) {
                    $target.prop('checked', true);

                    return;
                }

                $target.val(value);
            });
        });
    });
};

/**
 * Identical to updateOtherInput(), but only runs for checkboxes,
 * to be used with updateOtherInputOnUncheck()
 *
 * When element is checked, changes value of target
 */
PUPHPET.updateOtherInputOnCheck = function() {
    $(document).on('click', '.update-other-input-on-check', function(e){
        var $parent = $(this);

        if (!$parent.is(':checked')) {
            return true;
        }

        $.each($(this).data(), function(key, value) {
            // jQuery changed "data-foo-bar" to "dataFooBar". Change them back.
            key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

            // Only work with data attributes that have "update-on-check-"
            if (key.search('update-on-check-') !== 0) {
                return true;
            }

            key = key.replace('update-on-check-', '');

            var $target = $('#' + key);

            // If target element is not defined as #foo, maybe it is an input,name,value target
            if (!$target.length) {
                var selector = 'input[name="' + key + '"]';

                if (value.length) {
                    selector = selector + '[value="'+ value +'"]'
                }

                $target = $(selector)
            }

            /**
             * If target is checkbox element, check if clicked element was checked or unchecked.
             */
            if ($target.is(':checkbox')) {
                var checked;

                // Element gets checked, wants target to be checked
                if (value && $parent.is(':checked')) {
                    checked = true;
                }
                // Element gets checked, wants target to be unchecked
                else if (!value && $parent.is(':checked')) {
                    checked = false;
                }
                // Element gets unchecked
                else {
                    return 1;
                }

                $target.prop('checked', checked);

                return true;
            }

            if (!$target.is(':radio') && !$target.is(':checkbox')) {
                $target.val(value);
            }
        });
    });
};

/**
 * Identical to updateOtherInput(), but only runs for checkboxes,
 * to be used with updateOtherInputOnCheck()
 *
 * When element is unchecked, changes value of target
 */
PUPHPET.updateOtherInputOnUncheck = function() {
    $(document).on('click', '.update-other-input-on-uncheck', function(e){
        var $parent = $(this);

        if ($parent.is(':checked')) {
            return true;
        }

        $.each($(this).data(), function(key, value) {
            // jQuery changed "data-foo-bar" to "dataFooBar". Change them back.
            key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

            // Only work with data attributes that have "update-on-uncheck-"
            if (key.search('update-on-uncheck-') !== 0) {
                return true;
            }

            key = key.replace('update-on-uncheck-', '');

            var $target = $('#' + key);

            // If target element is not defined as #foo, maybe it is an input,name,value target
            if (!$target.length) {
                var selector = 'input[name="' + key + '"]';

                if (value.length) {
                    selector = selector + '[value="'+ value +'"]'
                }

                $target = $(selector)
            }

            /**
             * If target is checkbox element, check if clicked element was checked or unchecked.
             */
            if ($target.is(':checkbox')) {
                var checked;

                // Element gets unchecked, wants target to be checked
                if (value && !$parent.is(':checked')) {
                    checked = true;
                }
                // Element gets unchecked, wants target to be unchecked
                else if (!value && !$parent.is(':checked')) {
                    checked = false;
                }
                // Element gets unchecked
                else {
                    return 1;
                }

                $target.prop('checked', checked);

                return true;
            }

            if (!$target.is(':radio') && !$target.is(':checkbox')) {
                $target.val(value);
            }
        });
    });
};

/**
 * Handles sidebar activity
 */
PUPHPET.sidebarMenuClick = function() {
    // prevent scrolling to top of page on section title click
    $(document).on('click', '#sidebar .sidebar-menu > .sub-menu > a', function (e) {
        e.stopPropagation();
        e.preventDefault && e.preventDefault();
    });

    // handles sliding sections open and closed on link click
    $(document).on('click', '#sidebar .sub-menu > a', function (e) {
        var last = $('.sub.open', $('#sidebar'));

        $(last).slideUp(200);
        $(last).removeClass('open');

        $('.menu-arrow', $(last).parent()).addClass('fa-angle-right');
        $('.menu-arrow', $(last).parent()).removeClass('fa-angle-down');

        var sub = $(this).next();

        if (sub.is(':visible')) {
            $('.menu-arrow', this).addClass('fa-angle-right');
            $('.menu-arrow', this).removeClass('fa-angle-down');

            sub.slideUp(200);
            $(sub).removeClass('open');

            return;
        }

        $('.menu-arrow', this).addClass('fa-angle-down');
        $('.menu-arrow', this).removeClass('fa-angle-right');

        sub.slideDown(200);
        $(sub).addClass('open');
    });

    // removes active class from non-selected section/link
    $(document).on('click', '#sidebar .sub-menu ul.sub a', function (e) {
        window.location.hash = this.hash;

        var $activeSection = $('#sidebar .sub-menu.active');
        var $activeLink    = $('#sidebar .sub-menu ul.sub li.active');

        $activeSection.removeClass('active');
        $activeLink.removeClass('active');

        $(this).parent().addClass('active');
        $(this).closest('.sub-menu').addClass('active');

        $('html, body').scrollTop(0);

        $('#help-text-container .contents').html('');

        var $headerBlock = $($(this).attr('href') + ' > .section-header').eq(0);

        if ($headerBlock.length != 0) {
            $('#page-header').html($headerBlock.html());
        }
    });
};

/**
 * Handles displaying section help information on right-side element
 */
PUPHPET.helpTextDisplay = function() {
    var $helpContainer = $('#help-text-container');

    $helpContainer.on('affix.bs.affix', function () {
        $(this).width($(this).parent().width());
    });

    $helpContainer.affix({
        offset: {
            top: 180
        }
    });

    var $previousElement = '';

    $(document).on('mouseenter', '.field-container .form-group', function (e) {
        if ($(this).has('> .help-text').length == 0) {
            return;
        }

        var $helpText = $('> .help-text', this).eq(0);

        changeText($helpText.html());
    });

    $(document).on('mouseenter', '.field-container .form-group .radio-tile', function (e) {
        if ($(this).has('.help-text').length == 0) {
            return;
        }

        var $helpText = $('.help-text', this).eq(0);

        changeText($helpText.html());
    });

    function changeText(contents) {
        if ($previousElement && ($previousElement == contents)) {
            return;
        }

        $previousElement = contents;

        var h2Div       = $('> h2', $helpContainer).eq(0);
        var contentsDiv = $('.contents', $helpContainer).eq(0);

        h2Div.css('display', 'block');

        contentsDiv.html(contents);
        changedTextColor();
    }

    function changedTextColor() {
        $helpContainer.css('color', '#F67400');

        setTimeout(function () {
            $helpContainer.css('color', '#000');
        }, 500);
    }
};

/**
 * Adds HTML response based on clicked element's data-source-url value.
 *
 * Adds the response above clicked element, and then re-runs selectize.js
 * on new elements.
 */
PUPHPET.addBlock = function() {
    $(document).on('click', '.add-block', function(e){
        e.stopPropagation();
        e.preventDefault && e.preventDefault();

        var sourceUrl      = this.getAttribute('data-source-url');
        var clickedElement = $(this);

        $.ajax({
            url: sourceUrl,
            cache: false
        }).done(function(response) {
            var $row = $(response).insertBefore(clickedElement).hide().slideDown(500);
            PUPHPET.runSelectize($row);
        });
    });
};

/**
 * Deletes element based on data id
 */
PUPHPET.deleteBlock = function() {
    $(document).on('click', '.delete-block', function(e){
        e.stopPropagation();
        e.preventDefault && e.preventDefault();

        var blockId = this.getAttribute('data-block-id');
        var $blockContainer = $('#' + blockId);

        // fadeOut
        $blockContainer.slideUp(500, function() {
            $(this).remove();
        });
    });
};

/**
 * Can hide or show an element depending on a radio element's state
 */
PUPHPET.toggleDisplayOnSelect = function() {
    $(document).on('change', '.display-on-select, .hide-on-select', function(e){
        var dataValue = this.getAttribute('data-target-id');

        if (dataValue == undefined) {
            return;
        }

        var targetId = snakeCaseToDash(this.getAttribute('data-target-id'));
        var $target  = $('#' + targetId);

        if ($(this).hasClass('display-on-select')) {
            $target.slideDown();

            return;
        }

        $target.slideUp();
    });
};

/**
 * Run selectize.js on initial page load, and then re-run it whenever
 * new selectize-enabled elements are dynamically added to the DOM.
 *
 * @param $element
 */
PUPHPET.runSelectize = function($element) {
    // input or select elements; allows user to create their own tags
    var $selectTagsEditable = $('.tags, .select-tags-editable', $element).selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        },
        maxItems: null,
        valueField: 'value',
        labelField: 'text',
        searchField: 'value'
    });

    // select elements; asks user for value of selected tags; cannot create own tags
    var $selectTagsUserInput = PUPHPET.selectizeTagsUserInput($element);

    // select single element; does not allow creating new tag
    var $selectTag = $('.select-tag', $element).selectize({
        persist: false,
        create: false
    });

    // select elements; does not allow creating new tags
    var $selectTags = $('.select-tags', $element).selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: false
    });

    PUPHPET._trackSelectize($selectTagsEditable);
    PUPHPET._trackSelectize($selectTagsUserInput);
    PUPHPET._trackSelectize($selectTag);
    PUPHPET._trackSelectize($selectTags);
};

/**
 * Active for select type elements.
 *
 * On user adding option, prompts user for data, and creates a new, matching
 * hidden element containing user input for easier handling of POSTed data.
 *
 * On user remove option, adds the removed element back to the available options
 * list and deletes the hidden element related to removed option.
 *
 * @param $element
 */
PUPHPET.selectizeTagsUserInput = function($element) {
    var $selectTagsUserInput = $('.select-tags-user-input', $element).selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: false,
        onItemAdd: function(value, $item) {
            var targetContainer     = '#' + $(this['$input'])[0].getAttribute('data-target-container');
            var targetNameStructure = $(this['$input'])[0].getAttribute('data-target-name');
            var elementName         = targetNameStructure + '[' + this.options[value].text + ']';

            var suffix = prompt('Enter Value:') || '0';
            var label  = this.options[value].text + ' = ' + suffix;
            var data   = $.extend({}, this.options[value], {
                text: label
            });

            // Append this user input as a new hidden element
            $('<input>').attr({
                type:  'hidden',
                name:  elementName,
                value: suffix
            }).appendTo(targetContainer);

            this.updateOption(value, data);
        },
        onItemRemove: function(value, $item) {
            var targetContainer     = '#' + $(this['$input'])[0].getAttribute('data-target-container');
            var targetNameStructure = $(this['$input'])[0].getAttribute('data-target-name');
            var elementName         = targetNameStructure + '[' + this.options[value].value + ']';

            $(targetContainer + ' input[name="' + elementName + '"]').remove();

            var data = $.extend({}, this.options[value], {
                text: value
            });

            this.updateOption(value, data);
        }
    });

    // Adds pre-selected option values to selectize field
    for (var i = 0; i < $selectTagsUserInput.length; i++) {
        var $selectElement = $selectTagsUserInput[i].selectize;
        var targetContainer = '#' + $selectTagsUserInput[i].getAttribute('data-target-container');
        var $selectedItems = $(targetContainer);

        if (!$selectedItems.length) {
            continue;
        }

        $selectedItems.children().each(function() {
            var optionName  = this.getAttribute('data-option-name');
            var optionValue = $(this).val();

            var label = $selectElement.options[optionName].text + ' = ' + optionValue;
            var data  = $.extend({}, $selectElement.options[optionName], {
                text: label
            });

            $selectElement.updateOption(optionName, data);
        });
    }

    return $selectTagsUserInput;
};

var selectizedObjects = [];

/**
 * Keep track of all initialized selectize.js elements
 *
 * @param $selectizeElements
 * @private
 */
PUPHPET._trackSelectize = function($selectizeElements) {
    for (var i = 0; i < $selectizeElements.length; i++) {
        selectizedObjects[$selectizeElements[i].id] = $selectizeElements[i];
    }
};

/**
 * Allows adding an item to a selectize.js element on user click
 */
PUPHPET.selectizeAddClickedToElement = function() {
    $(document).on('click', '.addClickedToSelectizeElement', function(e){
        var target    = this.getAttribute('data-target');
        var itemValue = this.getAttribute('data-value');
        var itemTitle = this.getAttribute('data-title') != null
            ? this.getAttribute('data-title')
            : $(this).text();

        if (!(target in selectizedObjects)) {
            return false;
        }

        var control = selectizedObjects[target].selectize;

        control.addOption({
            value: itemValue,
            text: itemTitle
        });
        control.addItem(itemValue);

        return false;
    });
};

PUPHPET.submitUncheckedCheckboxes = function () {
    $(document).on('click', 'input:checkbox', function(e) {
        if (!$(this).is(':checked')) {
            $(this).after('<input type="hidden" name="' + $(this).attr('name') + '" value="0">');

            return;
        }

        $('input[type="hidden"][name="' + $(this).attr('name') + '"]').remove();
    });
};

PUPHPET.changeTabOnAnchorChange = function () {
    $(window).on('hashchange', function() {
        PUPHPET.displayTabFromUrl();
    });
};

/**
 * Catches anchor tag (#foo) in URL bar and displays proper tab
 */
PUPHPET.displayTabFromUrl = function () {
    var $link = $('#sidebar .sidebar-menu > .sub-menu .sub a[data-toggle="tab"]');

    if (window.location.hash.length) {
        var $hashLink = $link.filter('[href=' + window.location.hash + ']');

        var $activeSection = $('#sidebar .sub-menu.active');
        var $activeLink    = $('#sidebar .sub-menu ul.sub li.active');

        $activeSection.removeClass('active');
        $activeLink.removeClass('active');

        $hashLink.addClass('active');

        $hashLink.parent().parent().addClass('open');
        $hashLink.parent().parent().parent().addClass('active');

        $hashLink.tab('show');

        var $headerBlock = $(window.location.hash + ' > .section-header').eq(0);

        if ($headerBlock.length != 0) {
            $('#page-header').html($headerBlock.html());
        }
    }
};

PUPHPET.toggleDeployTargetVisibility = function() {
    $(document).on('change', 'input:radio[name="vagrantfile[target]"]', function(e) {
        var $tab = $('#vagrantfile-' + $(this).val());
        $('.hideable', $tab).removeClass('hidden');

        $('input:radio[name="vagrantfile[target]"]').not(this).each(function() {
            var $tab = $('#vagrantfile-' + $(this).val());
            $('.hideable', $tab).addClass('hidden');
        });
    });
};

$(document).ready(function() {
    PUPHPET.updateOtherInput();
    PUPHPET.updateOtherInputSelect();
    PUPHPET.updateOtherInputOnCheck();
    PUPHPET.updateOtherInputOnUncheck();
    PUPHPET.runSelectize(null);
    PUPHPET.selectizeAddClickedToElement();
    PUPHPET.addBlock();
    PUPHPET.deleteBlock();
    PUPHPET.submitUncheckedCheckboxes();
    PUPHPET.changeTabOnAnchorChange();
    PUPHPET.displayTabFromUrl();
    PUPHPET.toggleDeployTargetVisibility();

    PUPHPET.sidebarMenuClick();
    PUPHPET.helpTextDisplay();
    PUPHPET.toggleDisplayOnSelect();
});

/**
 * jQuery changed "data-foo-bar" to "dataFooBar". Change them back.
 * @param name
 */
function snakeCaseToDash(name) {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
