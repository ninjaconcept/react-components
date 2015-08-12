'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var AutoCompleteInput = (function (_Component) {
  _inherits(AutoCompleteInput, _Component);

  function AutoCompleteInput(props) {
    _classCallCheck(this, AutoCompleteInput);

    _get(Object.getPrototypeOf(AutoCompleteInput.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: '',
      valueBeforeUpDown: null,
      showSuggestions: false,
      suggestions: null,
      suggestionFocus: 0
    };
  }

  _createClass(AutoCompleteInput, [{
    key: '_showSuggestions',
    value: function _showSuggestions(input) {
      var suggestions = this.props.suggestions;

      if (!input) {
        this.setState({ showSuggestions: false });
      } else {
        this.setState({
          showSuggestions: true
        });
      }
    }
  }, {
    key: '_handleValueChange',
    value: function _handleValueChange() {
      var newState = {};
      var value = event.target.value;

      if (!value) {
        newState.showSuggestions = true;
        newState.suggestions = null;
        newState.valueBeforeUpDown = null;
        newState.suggestionFocus = 0;
      } else {
        var suggestionsCallback = this.props.suggestionsCallback;

        //TODO debounce
        var suggestions = suggestionsCallback(value);
        if (suggestions) {
          newState.suggestions = suggestions;
          newState.showSuggestions = true;
        }
      }
      this.setState(newState);
    }
  }, {
    key: '_getNextSuggestionIndex',
    value: function _getNextSuggestionIndex() {
      var _state = this.state;
      var suggestions = _state.suggestions;
      var suggestionFocus = _state.suggestionFocus;

      var result = undefined;
      var nextSuggestionIndex = suggestionFocus + 1;
      if (suggestions[nextSuggestionIndex]) {
        result = nextSuggestionIndex;
      } else {
        // previous suggestion was last in list, so use first one
        result = 0;
      }
      return result;
    }
  }, {
    key: '_getPreviousSuggestionIndex',
    value: function _getPreviousSuggestionIndex() {
      var _state2 = this.state;
      var suggestions = _state2.suggestions;
      var suggestionFocus = _state2.suggestionFocus;

      var result = undefined;
      var previousSuggestionIndex = suggestionFocus - 1;
      if (suggestions[previousSuggestionIndex]) {
        result = previousSuggestionIndex;
      } else {
        // previous suggestion was first in list, so use last one
        result = suggestions.length - 1;
      }
      return result;
    }
  }, {
    key: '_focusSuggestionUsingKeyboard',
    value: function _focusSuggestionUsingKeyboard(direction) {
      var _state3 = this.state;
      var value = _state3.value;
      var valueBeforeUpDown = _state3.valueBeforeUpDown;
      var suggestions = _state3.suggestions;

      var newState = {};
      if (!valueBeforeUpDown) {
        newState.valueBeforeUpDown = value;
      }
      if (direction == 'up') {
        newState.suggestionFocus = this.getPreviousSuggestionIndex();
      } else if (direction == 'down') {
        newState.suggestionFocus = this.getNextSuggestionIndex();
      }
      newState.value = suggestions[newState.suggestionFocus];
      this.setState(newState);
    }
  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown() {
      var _state4 = this.state;
      var valueBeforeUpDown = _state4.valueBeforeUpDown;
      var showSuggestions = _state4.showSuggestions;

      var newState = {};
      switch (event.keyCode) {
        case 13:
          // Enter
          newState.valueBeforeUpDown = null;
          newState.showSuggestions = false;
          event.preventDefault();
          break;
        case 27:
          // ESC
          newState.value = valueBeforeUpDown;
          newState.valueBeforeUpDown = null;
          event.preventDefault();
          break;
        case 38:
          // Up
          if (showSuggestions) {
            this.focusSuggestionUsingKeyboard('up');
          }
          event.preventDefault();
          break;
        case 40:
          // Down
          if (showSuggestions) {
            this.focusSuggestionUsingKeyboard('down');
          } else {
            newState.showSuggestions = true;
          }
          event.preventDefault();
          break;
      }
      this.setState(newState);
    }
  }, {
    key: '_selectSuggestionUsingClick',
    value: function _selectSuggestionUsingClick(suggestionsIndex) {
      var suggestions = this.state.suggestions;

      this.setState({
        value: suggestions[suggestionsIndex],
        suggestionFocus: suggestionsIndex,
        showSuggestions: false,
        valueBeforeUpDown: null
      });
    }
  }, {
    key: '_renderSuggestions',
    value: function _renderSuggestions() {
      var _this = this;

      var suggestions = this.state.suggestions;

      if (suggestions) {
        return _react2['default'].createElement(
          'div',
          null,
          suggestions.map(function (suggestion, index) {
            return _react2['default'].createElement(
              _reactBootstrap.ListGroupItem,
              { onClick: function () {
                  return _this.selectSuggestionUsingClick(index);
                },
                key: 'suggestion_' + index },
              suggestion
            );
          })
        );
      } else {
        return _react2['default'].createElement('div', null);
      }
    }

    // TODO dynamic width
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state5 = this.state;
      var value = _state5.value;
      var showSuggestions = _state5.showSuggestions;

      var suggestionsStyle = {
        position: 'absolute'
      };
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_reactBootstrap.Input, _extends({}, this.props.inputAttributes, {
          type: 'text',
          value: value,
          autoComplete: 'off',
          ref: 'input',
          onChange: function () {
            return _this2.handleValueChange();
          },
          onKeyDown: function () {
            return _this2.handleKeyDown();
          }
        })),
        _react2['default'].createElement(
          _reactBootstrap.Overlay,
          {
            show: showSuggestions,
            onHide: function () {
              return _this2.setState({ showSuggestions: false });
            },
            placement: 'bottom',
            container: this,
            rootClose: true,
            target: function (props) {
              return _react2['default'].findDOMNode(_this2.refs.input);
            } },
          _react2['default'].createElement(
            _reactBootstrap.Grid,
            { style: suggestionsStyle },
            _react2['default'].createElement(
              _reactBootstrap.Row,
              null,
              _react2['default'].createElement(
                _reactBootstrap.Col,
                { md: 6 },
                _react2['default'].createElement(
                  _reactBootstrap.ListGroup,
                  null,
                  this.renderSuggestions()
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AutoCompleteInput;
})(_react.Component);

exports['default'] = AutoCompleteInput;
module.exports = exports['default'];