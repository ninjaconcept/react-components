import React, {Component} from "react";
import Router, {Route, RouteHandler} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import AutoCompleteInputExample from './examples/AutoCompleteInputExample';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>React-Components-Examples</h1>
        </Row>
        <Row>
          <Col md={8}>
            <RouteHandler />
          </Col>
        </Row>
      </Grid>
    )
  }
}

var routes = (
  <Route handler={App} path="/">
    <Route name="auto-complete-input" path="auto-complete-input" handler={AutoCompleteInputExample}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
