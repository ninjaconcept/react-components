import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import AutoCompleteInput from './../src/AutoCompleteInput'

export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let inputAttributes = {
      placeholder: 'Search for food...',
      label: 'Food'
    };
    let foods = ['Cheese', 'Bread', 'Noodles', 'Beans', 'Berries'];
    let getSuggestions = (input, callback) => {
      const regex = new RegExp('^' + input, 'i');
      const suggestions = foods.filter(food => regex.test(food));
      setTimeout(() => callback(suggestions), 300); // Emulate API call
    };
    return (
      <Grid>
        <Row>
          <h1>Component-Examples</h1>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <AutoCompleteInput inputAttributes={inputAttributes}
                               suggestions={getSuggestions}/>
          </Col>
        </Row>
        <Row>
          Lorem Ipsum
        </Row>
      </Grid>
    );
  }
}