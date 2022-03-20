import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { WrappedLoginScreen } from './LoginScreen';
import { Routes, Route } from "react-router-dom";
import {Dashboard} from "./Dashboard";
import { Subscriptions } from './Subscriptions';


class App extends React.Component {


  render() {
    return(
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/login" element={<WrappedLoginScreen />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
    )
  }

}

export default App;
