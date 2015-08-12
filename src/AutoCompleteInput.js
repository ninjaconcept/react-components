import React, {Component} from 'react';
import {Input, Overlay, ListGroup, ListGroupItem} from 'react-bootstrap';
import debounce from 'debounce';

export default class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueBeforeFocus: null,
      showSuggestions: false,
      suggestions: null,
      suggestionFocus: null,
      inputWidth: 0
    };
    this._getSuggestions = debounce(props.suggestions, 200);
  }

  componentDidMount() {
    let input = React.findDOMNode(this.refs.input);
    if (input) {
      this.setState({
        inputWidth: input.offsetWidth
      });
    }
  }

  getNextSuggestionIndex() {
    let {suggestions, suggestionFocus} = this.state;
    let result;
    let nextSuggestionIndex = suggestionFocus + 1;
    if (suggestions[nextSuggestionIndex]) {
      result = nextSuggestionIndex;
    } else {
      // previous suggestion was last in list, so use first one
      result = 0;
    }
    return result;
  }

  getPreviousSuggestionIndex() {
    let {suggestions, suggestionFocus} = this.state;
    let result;
    let previousSuggestionIndex = suggestionFocus - 1;
    if (suggestions[previousSuggestionIndex]) {
      result = previousSuggestionIndex;
    } else {
      // previous suggestion was first in list, so use last one
      result = suggestions.length - 1;
    }
    return result;
  }

  focusSuggestionUsingKeyboard(direction) {
    let suggestionFocus;
    if (direction == 'up') {
      suggestionFocus = this.getPreviousSuggestionIndex();
    } else if (direction == 'down') {
      suggestionFocus = this.getNextSuggestionIndex();
    }
    this.focusSuggestion(suggestionFocus);
    this.setState({suggestionFocus: suggestionFocus});
  }

  focusSuggestionUsingMouse(index) {
    this.focusSuggestion(index);
    this.setState({suggestionFocus: index});
  }

  focusSuggestion(newFocus) {
    let {suggestions, suggestionFocus, value, valueBeforeFocus} = this.state;
    let newState = {};
    if (! valueBeforeFocus) {
      newState.valueBeforeFocus = value;
    }
    newState.value = suggestions[newFocus];
    React.findDOMNode(this.refs['suggestion_' + suggestionFocus]).classList.remove('active');
    React.findDOMNode(this.refs['suggestion_' + newFocus]).classList.add('active');
    this.setState(newState);
  }

  resetComponent() {
    this.setState({
      value: '',
      valueBeforeFocus: null,
      showSuggestions: false,
      suggestions: null,
      suggestionFocus: null
    });
  }

  fetchSuggestions(value) {
    this._getSuggestions(value, result => {
      let newState = {};
      if (result && result.length > 0) {
        newState.suggestions = result;
        newState.suggestionFocus = result.length - 1;
        newState.showSuggestions = true;
      } else {
        newState.suggestions = null;
        newState.suggestionFocus = null;
        newState.showSuggestions = false;
      }
      this.setState(newState);
    });
  }

  handleValueChange() {
    let {value} = event.target;
    if (! value) {
      this.resetComponent();
    } else {
      this.setState({value: value});
      this.fetchSuggestions(value);
    }
  }

  handleKeyDown() {
    let {valueBeforeFocus, showSuggestions, suggestions} = this.state;
    let newState = {};
    switch (event.keyCode) {
      case 13: // Enter
        newState.valueBeforeFocus = null;
        newState.showSuggestions = false;
        event.preventDefault();
        break;
      case 27: // ESC
        newState.value = valueBeforeFocus;
        newState.valueBeforeFocus = null;
        newState.suggestionFocus = suggestions.length - 1;
        event.preventDefault();
        break;
      case 38: // Up
        if (showSuggestions) {
          this.focusSuggestionUsingKeyboard('up');
        }
        event.preventDefault();
        break;
      case 40: // Down
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

  selectSuggestionUsingClick(suggestionsIndex) {
    let {suggestions} = this.state;
    this.setState({
      value: suggestions[suggestionsIndex],
      suggestionFocus: suggestionsIndex,
      showSuggestions: false,
      valueBeforeFocus: null
    });
  }

  renderSuggestions() {
    let {suggestions} = this.state;
    if (suggestions) {
      return (
        <div>
          {suggestions.map((suggestion, index) => {
            return <ListGroupItem onClick={() => this.selectSuggestionUsingClick(index)}
                                  onMouseEnter={() => this.focusSuggestionUsingMouse(index)}
                                  key={'suggestion_' + index}
                                  ref={'suggestion_' + index}>{suggestion}</ListGroupItem>;
          })}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  render() {
    let {value, showSuggestions, inputWidth} = this.state;
    let suggestionsStyle = {
      position: 'absolute',
      width: inputWidth,
      marginLeft: 15
    };
    return (
      <div>
        <Input {...this.props.inputAttributes}
          type='text'
          value={value}
          autoComplete='off'
          ref='input'
          onChange={() => this.handleValueChange()}
          onKeyDown={() => this.handleKeyDown()}
          />
        <Overlay
          show={showSuggestions}
          onHide={() => this.setState({ showSuggestions: false })}
          placement='bottom'
          container={this}
          rootClose={true}
          target={ props => React.findDOMNode(this.refs.input)}>
          <div style={suggestionsStyle}>
            <ListGroup>
              {this.renderSuggestions()}
            </ListGroup>
          </div>
        </Overlay>
      </div>
    );
  }
}
