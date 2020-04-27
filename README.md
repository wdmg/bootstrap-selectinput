# Bootstrap SelectInput
Select to dropdown list for Bootstrap 3

# Installation

    $ npm install bootstrap-selectinput-plugin
    $ bower install bootstrap-selectinput-plugin
    $ yarn add bootstrap-selectinput-plugin
    $ composer require bootstrap-selectinput-plugin

# Usage example

For example use the form-group:

    <div class="form-group">
        <label class="control-label" for="selectinput1">Select:</label>
        <select id="selectinput1" class="form-control">
            <option value="1">Select option one</option>
            <option value="2" selected>Select option two</option>
            <option value="3">Select option three</option>
            <option value="4" disabled>Select option one</option>
            <option value="5" selected>Select option two</option>
            <option value="6">Select option three</option>
        </select>
    </div>
    <div class="form-group">
        <label class="control-label" for="selectinput2">Multiple select:</label>
        <select id="selectinput2" multiple class="form-control">
            <option value="1">Select option one</option>
            <option value="2" selected>Select option two</option>
            <option value="3">Select option three</option>
            <option value="4" disabled>Select option one</option>
            <option value="5" selected>Select option two</option>
            <option value="6">Select option three</option>
        </select>
    </div>

... and init from script:

    <script type="text/javascript">
        $(document).ready(function () {
            $('select').selectinput({
                dropdownClass: '.dropdown .some-dropdown',
                toggleText: 'Select option',
                toggleCaret: '<span class="fa fa-chevron-down"></span>',
                autocomplete: 'http://example.com/api/get/options',
                ...
            });
        });
    </script>

# Options

| Name            | Type     | Default          | Description                                                |
|:--------------- |:--------:|:---------------- |:---------------------------------------------------------- |
| dropdownClass   | string   | '.dropdown'      | The class for the dropdown container. |
| listClass       | string   | '.dropdown-menu' | Class for dropdown list. |
| itemClass       | string   | '.dropdown-item' | Class for the item in the dropdown list. |
| toggleClass     | string   | '.btn .btn-default .dropdown-toggle' | Class of the button for expanding the dropdown. |
| toggleText      | string   | 'Dropdown'       | Default text of the toggle button. |
| toggleCaret     | html     | `<span class="caret"></span>` | Default caret of the toggle button. |
| toggleChange    | boolean  | `true`           | Flag if need to change the toggle button text. |
| autocomplete    | boolean / string  | `false` | Autocomplete URL. |
| minInput        | integer  | `2`              | Min input lenght. |
| templates       | object   | `inputField`, `autocompleteList`, `autocompleteItem` | Autocomplete component templates. |
| onChange        | function | `onChange()`     | The function that is called when select option change. |
| onShow          | function | `onShow()`       | The function that is called when dropdown is ready to be displayed. |
| onShown         | function | `onShown()`      | The function that is called when dropdown is displayed. |
| onHide          | function | `onHide()`       | The function that is called when dropdown to prepare for hiding. |
| onHidden        | function | `onHidden()`     | Flag if need debug in console log. |
| onAutocompleteSuccess | function | `onAutocompleteSuccess()` | The function is called when autocomplete successfully called an ajax request. |
| onAutocompleteError   | function | `onAutocompleteError()`   | The function is called when autocomplete caused an ajax error. |
| onAutocompleteShow    | function | `onAutocompleteShow()`    | The function that is called when autocomplete is ready to be displayed. |
| onAutocompleteShown   | function | `onAutocompleteShown()`   | The function that is called when autocomplete is displayed. |
| onAutocompleteHide    | function | `onAutocompleteHide()`    | The function that is called when autocomplete to prepare for hiding. |
| onAutocompleteHidden  | function | `onAutocompleteHidden()`  | The function that is called when autocomplete is hidden. |
| debug           | boolean  | `false`          | The function that is called when dropdown is hidden. |


# Status and version
* v.1.2.1 - Fixed value from json for autocomplete
* v.1.2.0 - Refactoring, added autocomplete
* v.1.1.1 - OnChange bugfix
* v.1.1.0 - Added on change value of main select
