/**
 * Select to dropdown list for Bootstrap 3
 *
 * @category        jQuery Plugin
 * @version         1.0.2
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
        };
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
            dropdownClass: '.dropdown', // data-dropdown-class
            listClass: '.dropdown-menu', // data-list-class
            itemClass: '.dropdown-item', // data-item-class
            toggleClass: '.btn .btn-default .dropdown-toggle', // data-toggle-class
            toggleText: 'Dropdown', // data-toggle-text
            toggleCaret: '<span class="caret"></span>', // data-toggle-caret
            toggleChange: true, // data-toggle-change
            onChange: function onChange() { }, // The function that is called when select option change
            onShow: function onShow() { }, // The function that is called when dropdown is ready to be displayed
            onShown: function onShown() { }, // The function that is called when dropdown is displayed
            onHide: function onHide() { }, // The function that is called when dropdown to prepare for hiding
            onHidden: function onHidden() { }, // The function that is called when dropdown is hidden
            debug: false
        };

        var SelectInput = (function() {

            function SelectInput($element, config) {

                var _this = this;
                _classCallCheck(_this, SelectInput);

                // Prepare class name to remove dots (.) from selector
                config.dropdownClass = config.dropdownClass.replace(/\./g, '');
                config.toggleClass = config.toggleClass.replace(/\./g, '');
                config.listClass = config.listClass.replace(/\./g, '');
                config.itemClass = config.itemClass.replace(/\./g, '');

                // Merge default and custom options
                _this._config = $.extend({}, defaults, $element.data(), config);

                _this._$element = $element instanceof jQuery ? $element : $($element);

                if(_this._config.debug)
                    console.log('Select data attr: ', $element.data());

                _this._selectId = 'selectinput-' + (String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)).trim();

                _this._$element.each(function() {
                    var $select = $(this);
                    var type = $select.get(0).type;

                    if (!$select.data('select') || type === "select-one" || type === "select-multiple") {

                        $select.css('display', 'none').removeAttr('class');
                        $select.attr('data-select', _this._selectId);

                        var options = [];
                        $select.find('option').each(function() {

                            options.push({
                                "value": typeof $(this).attr('value') === "undefined" ? false : $(this).attr('value'),
                                "active": $(this).prop("selected"),
                                "disabled": $(this).prop("disabled"),
                                "label": $(this).text()
                            });

                            if (_this._config.toggleChange === true && $(this).prop("selected") === true) {
                                _this._config.toggleText = $(this).text();
                            }

                        });

                        var items = '';
                        var $dropdown = $('<div class="' + _this._config.dropdownClass + '" />');
                        var $button = $('<button class="' + _this._config.toggleClass + '" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />');
                        $button.html(_this._config.toggleText + ' ' + _this._config.toggleCaret);
                        $button.attr('id', _this._selectId);
                        $dropdown.append($button);

                        var $options = $('<ul class="' + _this._config.listClass + '" />');
                        $.each(options, function(key, option) {
                            if (option.active === true)
                                items += '<li class="' + _this._config.itemClass + ' active"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                            else if (option.disabled === true)
                                items += '<li class="' + _this._config.itemClass + ' disabled"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                            else
                                items += '<li class="' + _this._config.itemClass + '"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                        });
                        $options.append($(items));
                        $options.attr('aria-labelledby', _this._selectId);
                        $dropdown.append($options);

                        if(!$select.next().is('.dropdown')) {
                            $select.after($dropdown);
                        }

                        // Call a public methods
                        $dropdown.on('show.bs.dropdown', function(event) {

                            if(_this._config.debug)
                                console.log('Call `onShow` method', _this);

                            return _this._config.onShow.call(_this);
                        }).on('shown.bs.dropdown', function(event) {

                            if(_this._config.debug)
                                console.log('Call `onShown` method', _this);

                            return _this._config.onShown.call(_this);
                        }).on('hide.bs.dropdown', function(event) {

                            if(_this._config.debug)
                                console.log('Call `onHide` method', _this);

                            return _this._config.onHide.call(_this);
                        }).on('hidden.bs.dropdown', function(event) {

                            if(_this._config.debug)
                                console.log('Call `onHidden` method', _this);

                            return _this._config.onHidden.call(_this);
                        });

                        $options.find('li').on('click', function(event) {
                            event.preventDefault();

                            var _target = $(this);
                            var label = _target.find('> a').text();
                            var value = _target.find('> a').data('value');

                            if(type === "select-multiple") {
                                event.stopPropagation();
                                if (!_target.hasClass('disabled')) {
                                    if (_target.hasClass('active')) {

                                        _target.removeClass('active');

                                        $select.find('option').removeAttr('selected');
                                        $select.find('option').each(function() {

                                            if ($(this).attr('value') === value)
                                                $(this).removeAttr('selected');

                                            if ($(this).text() === label)
                                                $(this).removeAttr('selected');

                                        });
                                    } else {

                                        _target.addClass('active');
                                        $select.find('option').removeAttr('selected');
                                        $select.find('option').each(function() {

                                            if ($(this).attr('value') === value)
                                                $(this).attr('selected', 'selected');

                                            if ($(this).text() === label)
                                                $(this).attr('selected', 'selected');

                                        });
                                    }
                                    $select.trigger('change');
                                }
                            } else {
                                if (!_target.hasClass('disabled')) {

                                    $options.find('li').removeClass('active');
                                    _target.addClass('active');

                                    $select.find('option').removeAttr('selected');
                                    $select.find('option').each(function () {

                                        if ($(this).attr('value') === value)
                                            $(this).attr('selected', 'selected');

                                        if ($(this).text() === label)
                                            $(this).attr('selected', 'selected');

                                    });
                                    $select.trigger('change');
                                } else {
                                    event.stopPropagation();
                                }
                            }

                            if (_this._config.toggleChange === true && !_target.hasClass('disabled')) {
                                $button.html(label + ' ' + _this._config.toggleCaret);
                            }

                            if (!_target.hasClass('disabled')) {

                                if(_this._config.debug)
                                    console.log('Call `onChange` method', _this);

                                return _this._config.onChange.call(_this);
                            }

                        });

                    } else {
                        console.warn('Element has not select!', $select);
                    }

                });
            }

            _createClass(SelectInput, {
                element: {
                    value: function element() {
                        var _this = this;
                        return _this._$element;
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