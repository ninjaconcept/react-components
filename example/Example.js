import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NumeralInput from 'react-numeral-input';

export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Numeral-Input-Examples</h1>
        </Row>
        <Row>
          NumeralInput-Component with success and large and defaultValue
          <NumeralInput bsStyle='success' bsSize='large' value='10'/>
          NumeralInput-Component with defaultValue and numeralFormat
          <NumeralInput value='10.2' numeralFormat='0,0.0'/>
       </Row>
      </Grid>
    );
  }
}