'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _reactBootstrap = require('react-bootstrap');

global.jQuery = require('jquery');
require('jquery-caret');

var NumeralInput = (function (_Component) {
  _inherits(NumeralInput, _Component);

  function NumeralInput(props) {
    _classCallCheck(this, NumeralInput);

    _get(Object.getPrototypeOf(NumeralInput.prototype), 'constructor', this).call(this, props);

    var value = props.value;

    this.state = {
      numeralValue: this._convertValueToNumeralValue(value)
    };
  }

  _createClass(NumeralInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;

      if (value) {
        this.setState({
          numeralValue: this._convertValueToNumeralValue(value)
        });
      }
    }
  }, {
    key: '_convertValueToNumeralValue',
    value: function _convertValueToNumeralValue(value) {
      var numeralFormat = this.props.numeralFormat;

      return (0, _numeral2['default'])(value).format(numeralFormat);
    }

    //TODO fix issue that cursor is behind, when numeral inserts a comma: containing comas need to be compared to previous amount
  }, {
    key: '_handleInputValueChange',
    value: function _handleInputValueChange(event) {
      var inputField = event.target;
      var caretPosition = jQuery(inputField).caret();
      var value = inputField.value;

      var unformatedValue = (0, _numeral2['default'])().unformat(value);
      var onChange = this.props.onChange;

      this.setState({
        numeralValue: this._convertValueToNumeralValue(value)
      }, function () {
        onChange(unformatedValue);
        jQuery(inputField).caret(caretPosition);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props = this.props;
      var bsSize = _props.bsSize;
      var bsStyle = _props.bsStyle;
      var addonAfter = _props.addonAfter;
      var buttonAfter = _props.buttonAfter;
      var numeralValue = this.state.numeralValue;

      return _react2['default'].createElement(_reactBootstrap.Input, { type: 'text', value: numeralValue, bsSize: bsSize, bsStyle: bsStyle,
        addonAfter: addonAfter, buttonAfter: buttonAfter, onChange: function () {
          return _this._handleInputValueChange(event);
        } });
    }
  }]);

  return NumeralInput;
})(_react.Component);

exports['default'] = NumeralInput;

NumeralInput.defaultProps = {
  numeralFormat: '0,0',
  value: 0,
  onChange: function onChange() {}
};
module.exports = exports['default'];