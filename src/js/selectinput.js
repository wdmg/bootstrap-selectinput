/**
 * Select to dropdown list for Bootstrap 3
 *
 * @category        jQuery Plugin
 * @version         1.2.0
 * @author          Alexsander Vyshnyvetskyy <alex.vyshnyvetskyy@gmail.com>
 * @link            https://github.com/wdmg/bootstrap-selectinput
 * @copyright       Copyright (c) 2019 W.D.M.Group, Ukraine
 * @license         https://opensource.org/licenses/MIT Massachusetts Institute of Technology (MIT) License
 *
 */

+function($) {

    "use strict";
    var _createClass = (function() {
        function defineProperties(target, props) {
            for (var key in props) {
                var prop = props[key];
                prop.configurable = true;
                if (prop.value) prop.writable = true;
            }
            Object.defineProperties(target, props);
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var SelectInput = (function($) {

        var className = "selectinput";
        var _jQueryNoConflict = $.fn[className];

        // Public options and methods
        var defaults = {
            id: null, // Widget ID if need
            dropdownClass: '.dropdown .selectinput', // data-dropdown-class
            listClass: '.dropdown-menu', // data-list-class
            itemClass: '.dropdown-item', // data-item-class
            toggleClass: '.btn .btn-default .dropdown-toggle', // data-toggle-class
            toggleText: 'Dropdown', // data-toggle-text
            toggleCaret: '<span class="caret"></span>', // data-toggle-caret
            toggleChange: true, // data-toggle-change
            autocomplete: false, // Autocomplete URL
            minInput: 2, // Min input lenght
            templates: {
                inputField: '<input type="text" autocomplete="false" class="form-control" />',
                autocompleteList: '<div class="autocomplete dropdown-menu" />',
                autocompleteItem: '<li><a class="item" href="#" /></li>'
            },
            onChange: function onChange() { }, // The function that is called when select option change
            onShow: function onShow() { }, // The function that is called when dropdown is ready to be displayed
            onShown: function onShown() { }, // The function that is called when dropdown is displayed
            onHide: function onHide() { }, // The function that is called when dropdown to prepare for hiding
            onHidden: function onHidden() { }, // The function that is called when dropdown is hidden
            onAutocompleteSuccess: function onAutocompleteSuccess() { }, // The function is called when autocomplete successfully called an ajax request.
            onAutocompleteError: function onAutocompleteError() { }, // The function is called when autocomplete caused an ajax error
            onAutocompleteShow: function onAutocompleteShow() { }, // The function that is called when autocomplete is ready to be displayed
            onAutocompleteShown: function onAutocompleteShown() { }, // The function that is called when autocomplete is displayed
            onAutocompleteHide: function onAutocompleteHide() { }, // The function that is called when autocomplete to prepare for hiding
            onAutocompleteHidden: function onAutocompleteHidden() { }, // The function that is called when autocomplete is hidden
            debug: false
        };

        var SelectInput = (function() {

            function SelectInput($element, config) {

                var _this = this;
                _classCallCheck(_this, SelectInput);

                // Prepare class name to remove dots (.) from selector
                config.dropdownClass = config.dropdownClass.replace(/\./g, '');
                config.listClass = config.listClass.replace(/\./g, '');
                config.itemClass = config.itemClass.replace(/\./g, '');
                config.toggleClass = config.toggleClass.replace(/\./g, '');

                // Merge default and custom options
                _this._config = $.extend({}, defaults, $element.data(), config);

                // Get the parent element
                _this._$element = $element instanceof jQuery ? $element : $($element);

                // Configure widget id
                if (!_this._config.id)
                    _this._widgetId = 'selectinput-' + Date.now().toString().substr(6);
                else
                    _this._widgetId = 'selectinput-' + _this._config.id;

                // Each parents elements
                _this._$element.each(function() {
                    var $input = $(this);
                    var type = _this.getInputType($input);
                    if (!$input.data('select') || type === "select-one" || type === "select-multiple" || type === "text") {

                        // Hide parent element
                        if(!_this._config.debug) {
                            $input.css('display', 'none');
                        }
                        $input.removeAttr('class');

                        // Set widget id
                        $input.attr('data-select', _this._widgetId);

                        // Store predefined options and build dropdown
                        var options = _this.getInputValues($input);
                        _this.buildDropdown($input, options);
                        _this.attachBehaviors($input);
                        _this.attachOriginals($input);

                        // Build autocomplete
                        if (_this._config.autocomplete) {
                            if (type === "select-multiple") {
                                console.warn('Multiple select with autocomplete not allowed!', $input);
                            } else {
                                _this.attachAutocomplete($input);
                            }
                        }

                    } else {
                        console.warn('Element has not select or input field!', $input);
                    }
                });

            }

            _createClass(SelectInput, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
                    }
                },
                getInputType: {
                    value: function getInputType($input) {
                        return $input.get(0).type;
                    }
                },
                getInputValues: {
                    value: function getInputValues($input) {
                        var _this = this;
                        var values = [];
                        var type = _this.getInputType($input);

                        // Get options if element is select
                        if (type === "select-one" || type === "select-multiple") {
                            $input.find('option').each(function () {
                                values.push({
                                    "value": typeof $(this).attr('value') === "undefined" ? false : $(this).attr('value'),
                                    "active": $(this).prop("selected"),
                                    "disabled": $(this).prop("disabled"),
                                    "label": $(this).text()
                                });
                                if (_this._config.toggleChange === true && $(this).prop("selected") === true) {
                                    _this._config.toggleText = $(this).text();
                                }
                            });
                        }

                        return values;
                    }
                },
                appendItems: {
                    value: function appendItems(items, clear) {
                        var list = '';
                        var _this = this;

                        if (clear)
                            _this.$options.empty();

                        $.each(items, function(key, item) {

                            if (item.value && item.label) {

                                if (item.active === true || item.selected === true)
                                    list += '<li class="' + _this._config.itemClass + ' active"><a href="#" data-value="' + item.value + '">' + item.label + '</a></li>';
                                else if (item.disabled === true)
                                    list += '<li class="' + _this._config.itemClass + ' disabled"><a href="#" data-value="' + item.value + '">' + item.label + '</a></li>';
                                else
                                    list += '<li class="' + _this._config.itemClass + '"><a href="#" data-value="' + item.value + '">' + item.label + '</a></li>';

                            } else {
                                list += '<li class="' + _this._config.itemClass + '"><a href="#" data-value="' + item + '">' + item + '</a></li>';
                            }


                        });
                        _this.$options.append($(list));
                    }
                },
                attachOriginals: {
                    value: function attachOriginals($input) {
                        var _this = this;
                        var type = _this.getInputType($input);
                        $input.on('change', function() {

                            var value = $(this).val();
                            if (_this._config.debug)
                                console.log('Original select has change value to: `' + value + '`', _this);

                            if (value) {
                                var toggleText = '';
                                var $button = _this.$dropdown.find('[data-toggle="dropdown"]');

                                if (type === "select-multiple") {

                                    var delimiter = '';
                                    _this.$options.find('li').removeClass('active');
                                    $.each(value, function (index, value) {
                                        var $target = _this.$options.find('a[data-value="' + value + '"]');
                                        if ($target) {

                                            $target.parent('li').addClass('active');
                                            toggleText = toggleText + delimiter + $target.text();

                                            if (delimiter.length == 0)
                                                delimiter = ', ';
                                        }
                                    });

                                    if (toggleText.length > 0) {
                                        if (_this._config.autocomplete) {
                                            _this.$input.val(toggleText);
                                        } else {
                                            $button.html(toggleText + ' ' + _this._config.toggleCaret);
                                        }
                                    }
                                } else {
                                    var $target = _this.$options.find('a[data-value="' + value + '"]');
                                    if ($target) {
                                        _this.$options.find('li').removeClass('active');
                                        $target.parent('li').addClass('active');
                                        toggleText = $target.text();

                                        if (toggleText.length > 0) {
                                            if (_this._config.autocomplete) {
                                                _this.$input.val(toggleText);
                                            } else {
                                                $button.html(toggleText + ' ' + _this._config.toggleCaret);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                },
                attachBehaviors: {
                    value: function attachBehaviors($input) {
                        var _this = this;
                        var type = _this.getInputType($input);
                        _this.$options.find('li').on('click', function(event) {
                            event.preventDefault();

                            var _target = $(this);
                            var label = _target.find('> a').text();
                            var value = _target.find('> a').data('value');
                            var $button = $(_this).find('[data-toggle="dropdown"]');

                            if (_this._config.debug)
                                console.log('On `click` from options list:' + value +' = '+ label, _this);

                            if (type === "select-multiple") {

                                var values = $input.val();
                                if (!values)
                                    values = [];

                                if (!_target.hasClass('disabled')) {
                                    if (_target.hasClass('active')) {
                                        _target.removeClass('active');
                                        values.splice($input.val().indexOf(value), 1);
                                    } else {
                                        _target.addClass('active');
                                        values.push(value);
                                    }
                                }
                                $input.val(values).change();
                            } else if (type === "select-one") {
                                if (!_target.hasClass('disabled')) {
                                    _this.$options.find('li').removeClass('active');
                                    _target.addClass('active');

                                    if (_this._config.autocomplete && $input.find("option[value='"+value+"']").length == 0) {
                                        $input.prop('selectedIndex', -1);
                                        $input.append(new Option(label, value, true, false));
                                    }

                                    $input.val(value).change();
                                } else {
                                    event.stopPropagation();
                                }
                            } else if (type === "text") {
                                if (!_target.hasClass('disabled')) {
                                    $input.val(value).change();
                                } else {
                                    event.stopPropagation();
                                }
                            }

                            if (_this._config.debug)
                                console.log('Element change value to: ' + $input.val(), _this);

                            if (_this._config.toggleChange === true && !_target.hasClass('disabled')) {

                                if (_this._config.autocomplete) {
                                    if (label)
                                        _this.$input.val(label);

                                } else {
                                    if (label)
                                        $button.html(label + ' ' + _this._config.toggleCaret);

                                }
                            }

                            if (!_target.hasClass('disabled')) {

                                if(_this._config.debug)
                                    console.log('Call `onChange` method', _this);

                                return _this._config.onChange.call(_this);
                            }

                        });
                    }
                },
                buildDropdown: {
                    value: function buildDropdown($input, options) {
                        var _this = this;
                        var items = '';
                        var type = _this.getInputType($input);
                        _this.$input = $(_this._config.templates.inputField);
                        _this.$dropdown = $('<div class="' + _this._config.dropdownClass + '" />');
                        var $button = $('<button class="' + _this._config.toggleClass + '" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />');

                        $button.attr('id', _this._selectId);

                        if($input.prop('disabled'))
                            $button.prop('disabled', "disabled");

                        // Build autocomplete field
                        if (_this._config.autocomplete) {
                            var id = $input.attr('id');
                            var name = $input.attr('name');
                            var placeholder = $input.attr('placeholder');

                            if (id)
                                _this.$input.prop('id', id);

                            if (name)
                                _this.$input.prop('name', name);

                            if (_this._widgetId)
                                _this.$input.data('select', _this._widgetId);

                            if (placeholder)
                                _this.$input.prop('placeholder', placeholder);

                            _this.$dropdown.append(_this.$input);
                            $button.html(_this._config.toggleCaret);
                            _this.$dropdown.append($button);
                            _this.$dropdown.addClass('btn-group');

                        } else {
                            $button.html(_this._config.toggleText + ' ' + _this._config.toggleCaret);
                            _this.$dropdown.append($button);
                        }

                        _this.$options = $('<ul class="' + _this._config.listClass + '" />');

                        _this.appendItems(options);

                        _this.$options.attr('aria-labelledby', _this._selectId);
                        _this.$dropdown.append(_this.$options);
                        _this.$dropdown.attr('id', _this._widgetId);

                        if (!$input.next().is('.dropdown')) {
                            $input.after(_this.$dropdown);
                        }

                        if (type == "text") {
                            $input.remove();
                        }

                        return _this._$element;
                    }
                },
                parseURL: {
                    value: function parseURL(url) {
                        var pattern = new RegExp(/[?&]\w+=/);
                        if (pattern.test(url)) {
                            return JSON.parse('{"' + decodeURIComponent(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                        } else {
                            return JSON.parse('{"' + decodeURIComponent(url) + '":""}');
                        }
                    }
                },
                encodeURL: {
                    value: function encodeURL(object) {

                        var url = "";
                        var pattern = new RegExp(/[?&]\w+=/);
                        for (var key in object) {

                            if (pattern.test(url)) {
                                if (url != "")
                                    url += "&";
                            } else {
                                if (url != "")
                                    url += "?";
                            }

                            if (key != "" && encodeURIComponent(object[key]) == "")
                                url = key;
                            else if (key != "" && encodeURIComponent(object[key]) != "")
                                url += key + "=" + encodeURIComponent(object[key]);

                        }

                        return url;
                    }
                },
                attachAutocomplete: {
                    value: function buildAutocomplete($input) {
                        var _this = this;
                        _this._callbackInProcess = false;
                        _this.$input.on('input', function (event) {
                            var value = event.target.value.trim();
                            if (value.length >= parseInt(_this._config.minInput) && !_this._callbackInProcess) {
                                _this._callbackInProcess = true;

                                // Prepare URL for aJax and add value string
                                var url = _this.parseURL(_this._config.autocomplete);
                                url['value'] = value;
                                url['_t'] = Date.now();

                                $.ajax({
                                    url: _this.encodeURL(url),
                                    success: function(response, status, jqXHR) {

                                        if (!(typeof response == "object"))
                                            response = JSON.parse(response);

                                        if (_this._config.onAutocompleteSuccess instanceof Object && _this._config.onAutocompleteSuccess instanceof Function) {
                                            if (_this._config.debug)
                                                console.log('Call `onAutocompleteSuccess` method', this);

                                            _this._config.onAutocompleteSuccess.call(this);
                                        }

                                        if (Object.keys(response).length > 0) {

                                            if (_this._config.onAutocompleteShow instanceof Object && _this._config.onAutocompleteShow instanceof Function) {
                                                if (_this._config.debug)
                                                    console.log('Call `onAutocompleteShow` method', this);

                                                _this._config.onAutocompleteShow.call(this);
                                            }

                                            var items = [];
                                            $.each(response, function(index, item) {

                                                if (typeof item == "object") {
                                                    $.each(item, function(index, ret) {
                                                        item = ret;
                                                    });
                                                }

                                                if (item.substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                                                    items.push({
                                                        label: "<b>" + item.substr(0, value.length) + "</b>" + item.substr(value.length),
                                                        value: item
                                                    });
                                                }

                                            });

                                            _this.appendItems(items, true);
                                            _this.$dropdown.find('[data-toggle="dropdown"]').attr('aria-expanded', "true");
                                            _this.$dropdown.addClass('open');
                                            _this.attachBehaviors($input);
                                        } else {
                                            if (_this._config.onAutocompleteHide instanceof Object && _this._config.onAutocompleteHide instanceof Function) {
                                                if (_this._config.debug)
                                                    console.log('Call `onAutocompleteHide` method', this);

                                                _this._config.onAutocompleteHide().call(this);
                                            }
                                            _this.$dropdown.find('[data-toggle="dropdown"]').attr('aria-expanded', "false");
                                            _this.$dropdown.removeClass('open');
                                        }
                                        _this._callbackInProcess = false;
                                    },
                                    error: function(jqXHR, status, error) {
                                        if (_this._config.onAutocompleteError instanceof Object && _this._config.onAutocompleteError instanceof Function) {
                                            if (_this._config.debug)
                                                console.log('Call `onAutocompleteError` method', this);

                                            _this._config.onAutocompleteError.call(this);
                                        }
                                        _this._callbackInProcess = false;
                                    }
                                });
                            }
                        });
                    }
                }
            }, {
                Default: {
                    get: function() {
                        return defaults;
                    }
                },
                _jQueryInterface: {
                    value: function _jQueryInterface(config) {
                        var _this = this;
                        config = config || {};
                        return _this.each(function() {
                            var $this = $(_this);
                            var _config = $.extend({}, SelectInput.Default, $this.data(), typeof config === "object" && config);
                            new SelectInput(_this, _config);
                        });
                    }
                }
            });

            return SelectInput;

        })();

        $.fn[className] = SelectInput._jQueryInterface;
        $.fn[className].Constructor = SelectInput;
        $.fn[className].noConflict = function() {
            $.fn[className] = _jQueryNoConflict;
            return SelectInput._jQueryInterface;
        };

        return SelectInput;

    })(jQuery);
}(jQuery);