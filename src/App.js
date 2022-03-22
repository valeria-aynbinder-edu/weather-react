import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { WrappedLoginScreen } from './LoginScreen';
import { Routes, Route } from "react-router-dom";
import {Dashboard} from "./Dashboard";
import { Subscriptions } from './Subscriptions';
import { Container } from 'react-bootstrap';


class App extends React.Component {


  render() {
    return(

      <Container>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/login" element={<WrappedLoginScreen />} />
        </Routes>
      </Container>

    )
  }

}

export default App;
