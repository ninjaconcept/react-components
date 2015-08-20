import React, {Component} from 'react';
import {AutoCompleteInput} from './../../src/main'

export default class AutoCompleteInputExample extends Component {
  constructor(props) {
    super(props);
  }

  handleSelectionChange(selection) {
    console.log(selection);
  }

  getSuggestions(input) {
    let foods = [{
      name: 'Cheese',
      type: 'food',
      id: 0
    }, {
      name: 'Noodles',
      type: 'food',
      id: 1
    }, {
      name: 'Beans',
      type: 'food',
      id: 2
    }, {
      name: 'Beer',
      type: 'drink',
      id: 3
    }, {
      name: 'Berries',
      type: 'food',
      id: 4
    }];
    let regex = new RegExp('^' + input, 'i');
    let suggestions = foods.filter(food => regex.test(food.name));
    return new Promise(resolve => {
      setTimeout(() => resolve(suggestions), 300); // Emulate API call
    });
  }

  render() {
    let inputAttributes = {
      placeholder: 'Search for food...',
      label: 'Food'
    };
    return (
      <div>
        <AutoCompleteInput inputAttributes={inputAttributes}
                           suggestions={input => this.getSuggestions(input)}
                           onSelectionChange={selection => this.handleSelectionChange(selection)}/>
        Lorem Ipsum
      </div>
    );
  }
}