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

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var AutoCompleteInput = (function (_Component) {
  _inherits(AutoCompleteInput, _Component);

  function AutoCompleteInput(props) {
    _classCallCheck(this, AutoCompleteInput);

    _get(Object.getPrototypeOf(AutoCompleteInput.prototype), 'constructor', this).call(this, props);
    this.state = {
      value: '',
      valueBeforeFocus: null,
      showSuggestions: false,
      suggestions: null,
      suggestionFocus: null,
      inputWidth: 0
    };
    this._getSuggestions = (0, _debounce2['default'])(props.suggestions, 200);
  }

  _createClass(AutoCompleteInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var input = _react2['default'].findDOMNode(this.refs.input);
      if (input) {
        this.setState({
          inputWidth: input.offsetWidth
        });
      }
    }
  }, {
    key: 'getNextSuggestionIndex',
    value: function getNextSuggestionIndex() {
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
    key: 'getPreviousSuggestionIndex',
    value: function getPreviousSuggestionIndex() {
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
    key: 'focusSuggestionUsingKeyboard',
    value: function focusSuggestionUsingKeyboard(direction) {
      var suggestionFocus = undefined;
      if (direction == 'up') {
        suggestionFocus = this.getPreviousSuggestionIndex();
      } else if (direction == 'down') {
        suggestionFocus = this.getNextSuggestionIndex();
      }
      this.focusSuggestion(suggestionFocus);
      this.setState({ suggestionFocus: suggestionFocus });
    }
  }, {
    key: 'focusSuggestionUsingMouse',
    value: function focusSuggestionUsingMouse(index) {
      this.focusSuggestion(index);
      this.setState({ suggestionFocus: index });
    }
  }, {
    key: 'focusSuggestion',
    value: function focusSuggestion(newFocus) {
      var _state3 = this.state;
      var suggestions = _state3.suggestions;
      var suggestionFocus = _state3.suggestionFocus;
      var value = _state3.value;
      var valueBeforeFocus = _state3.valueBeforeFocus;

      var newState = {};
      if (!valueBeforeFocus) {
        newState.valueBeforeFocus = value;
      }
      newState.value = suggestions[newFocus];
      _react2['default'].findDOMNode(this.refs['suggestion_' + suggestionFocus]).classList.remove('active');
      _react2['default'].findDOMNode(this.refs['suggestion_' + newFocus]).classList.add('active');
      this.setState(newState);
    }
  }, {
    key: 'resetComponent',
    value: function resetComponent() {
      this.setState({
        value: '',
        valueBeforeFocus: null,
        showSuggestions: false,
        suggestions: null,
        suggestionFocus: null
      });
    }
  }, {
    key: 'fetchSuggestions',
    value: function fetchSuggestions(value) {
      var _this = this;

      this._getSuggestions(value, function (result) {
        var newState = {};
        if (result && result.length > 0) {
          newState.suggestions = result;
          newState.suggestionFocus = result.length - 1;
          newState.showSuggestions = true;
        } else {
          newState.suggestions = null;
          newState.suggestionFocus = null;
          newState.showSuggestions = false;
        }
        _this.setState(newState);
      });
    }
  }, {
    key: 'handleValueChange',
    value: function handleValueChange() {
      var value = event.target.value;

      if (!value) {
        this.resetComponent();
      } else {
        this.setState({ value: value });
        this.fetchSuggestions(value);
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown() {
      var _state4 = this.state;
      var valueBeforeFocus = _state4.valueBeforeFocus;
      var showSuggestions = _state4.showSuggestions;
      var suggestions = _state4.suggestions;

      var newState = {};
      switch (event.keyCode) {
        case 13:
          // Enter
          newState.valueBeforeFocus = null;
          newState.showSuggestions = false;
          event.preventDefault();
          break;
        case 27:
          // ESC
          newState.value = valueBeforeFocus;
          newState.valueBeforeFocus = null;
          newState.suggestionFocus = suggestions.length - 1;
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
          } else if (suggestions) {
            newState.showSuggestions = true;
          }
          event.preventDefault();
          break;
      }
      this.setState(newState);
    }
  }, {
    key: 'selectSuggestionUsingClick',
    value: function selectSuggestionUsingClick(suggestionsIndex) {
      var suggestions = this.state.suggestions;

      this.setState({
        value: suggestions[suggestionsIndex],
        suggestionFocus: suggestionsIndex,
        showSuggestions: false,
        valueBeforeFocus: null
      });
    }
  }, {
    key: 'renderSuggestions',
    value: function renderSuggestions() {
      var _this2 = this;

      var suggestions = this.state.suggestions;

      if (suggestions) {
        return _react2['default'].createElement(
          'div',
          null,
          suggestions.map(function (suggestion, index) {
            return _react2['default'].createElement(
              _reactBootstrap.ListGroupItem,
              { onClick: function () {
                  return _this2.selectSuggestionUsingClick(index);
                },
                onMouseEnter: function () {
                  return _this2.focusSuggestionUsingMouse(index);
                },
                key: 'suggestion_' + index,
                ref: 'suggestion_' + index },
              suggestion
            );
          })
        );
      } else {
        return _react2['default'].createElement('div', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state5 = this.state;
      var value = _state5.value;
      var showSuggestions = _state5.showSuggestions;
      var inputWidth = _state5.inputWidth;

      var containerStyle = {
        position: 'absolute',
        width: inputWidth,
        marginTop: -15,
        marginLeft: 0,
        zIndex: 2
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
            return _this3.handleValueChange();
          },
          onKeyDown: function () {
            return _this3.handleKeyDown();
          }
        })),
        _react2['default'].createElement(
          _reactBootstrap.Overlay,
          {
            show: showSuggestions,
            onHide: function () {
              return _this3.setState({ showSuggestions: false });
            },
            placement: 'bottom',
            container: this,
            rootClose: true },
          _react2['default'].createElement(
            'div',
            { style: containerStyle },
            _react2['default'].createElement(
              _reactBootstrap.ListGroup,
              this.props.suggestionsAttributes,
              this.renderSuggestions()
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