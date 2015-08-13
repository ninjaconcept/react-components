import React, {Component} from 'react';
import {AutoCompleteInput} from './../../src/main'

export default class AutoCompleteInputExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let inputAttributes = {
      placeholder: 'Search for food...',
      label: 'Food',
      bsSize: 'large'
    };
    let foods = ['Cheese', 'Bread', 'Noodles', 'Beans', 'Berries'];
    let getSuggestions = (input, callback) => {
      const regex = new RegExp('^' + input, 'i');
      const suggestions = foods.filter(food => regex.test(food));
      setTimeout(() => callback(suggestions), 300); // Emulate API call
    };
    return (
      <div>
        <AutoCompleteInput inputAttributes={inputAttributes}
                           suggestions={getSuggestions}/>
        Lorem Ipsum
      </div>
    );
  }
}