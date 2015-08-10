import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Component-Examples</h1>
        </Row>
        <Row>
          // put examples here
        </Row>
      </Grid>
    );
  }
}