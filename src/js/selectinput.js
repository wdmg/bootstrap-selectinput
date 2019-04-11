/**
 * Select to dropdown list for Bootstrap 3
 *
 * @category        jQuery Plugin
 * @version         1.0.0
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
            dropdownClass: '.dropdown',
            toggleButtonClass: '.btn .btn-default .dropdown-toggle',
            dropdownMenuClass: '.dropdown-menu',
            dropdownItemClass: '.dropdown-item',
            toggleButtonCaret: '<span class="caret"></span>',
            debug: false
        };

        var SelectInput = (function() {

            function SelectInput($element, config) {

                var _this = this;
                _classCallCheck(_this, SelectInput);

                // Prepare class name to remove dots (.) from selector
                config.dropdownClass = config.dropdownClass.replace(/\./g, '');
                config.toggleButtonClass = config.toggleButtonClass.replace(/\./g, '');
                config.dropdownMenuClass = config.dropdownMenuClass.replace(/\./g, '');
                config.dropdownItemClass = config.dropdownItemClass.replace(/\./g, '');

                // Merge default and custom options
                _this._config = $.extend({}, defaults, config);

                _this._$element = $element instanceof jQuery ? $element : $($element);

                _this._selectId = 'selectinput-' + (String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)).trim();

                _this._$element.each(function() {
                    var $select = $(this);
                    var type = $select.get(0).type;

                    if (!$select.data('select') || type === "select-one" || type === "select-multiple") {

                        $select.css('display', 'none').removeAttr('class');
                        $select.attr('data-select', _this._selectId);

                        var buttonText = 'Dropdown';
                        var options = [];
                        $select.find('option').each(function() {

                            options.push({
                                "value": typeof $(this).attr('value') === "undefined" ? false : $(this).attr('value'),
                                "active": $(this).prop("selected"),
                                "disabled": $(this).prop("disabled"),
                                "label": $(this).text()
                            });

                            if ($(this).prop("selected") === true) {
                                buttonText = $(this).text();
                            }

                        });

                        var items = '';
                        var $dropdown = $('<div class="' + _this._config.dropdownClass + '" />');
                        var $button = $('<button class="' + _this._config.toggleButtonClass + '" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />');
                        $button.html(buttonText + ' ' + _this._config.toggleButtonCaret);
                        $button.attr('id', _this._selectId);
                        $dropdown.append($button);

                        var $options = $('<ul class="' + _this._config.dropdownMenuClass + '" />');
                        $.each(options, function(key, option) {
                            if (option.active === true)
                                items += '<li class="' + _this._config.dropdownItemClass + ' active"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                            else if (option.disabled === true)
                                items += '<li class="' + _this._config.dropdownItemClass + ' disabled"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                            else
                                items += '<li class="' + _this._config.dropdownItemClass + '"><a href="#" data-value="' + option.value + '">' + option.label + '</a></li>';
                        });
                        $options.append($(items));
                        $options.attr('aria-labelledby', _this._selectId);
                        $dropdown.append($options);

                        if(!$select.next().is('.dropdown')) {
                            $select.after($dropdown);
                        }

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

                                            if (_target.attr('value') === value)
                                                _target.removeAttr('selected');

                                            if (_target.text() === label)
                                                _target.removeAttr('selected');

                                        });
                                    } else {

                                        _target.addClass('active');
                                        $select.find('option').removeAttr('selected');
                                        $select.find('option').each(function() {

                                            if (_target.attr('value') === value)
                                                _target.attr('selected', 'selected');

                                            if (_target.text() === label)
                                                _target.attr('selected', 'selected');

                                        });
                                    }
                                }
                            } else {
                                if (!_target.hasClass('disabled')) {

                                    $options.find('li').removeClass('active');
                                    _target.addClass('active');

                                    $select.find('option').removeAttr('selected');
                                    $select.find('option').each(function () {

                                        if (_target.attr('value') === value)
                                            _target.attr('selected', 'selected');

                                        if (_target.text() === label)
                                            _target.attr('selected', 'selected');

                                    });
                                } else {
                                    event.stopPropagation();
                                }
                            }
                            $button.html(label  + ' ' + _this._config.toggleButtonCaret);
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