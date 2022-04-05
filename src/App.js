import React, { Component } from 'react';
import StaffList from './StaffList/StaffListComponent';
import './App.css';
import { STAFFS } from './shared/staffs';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS
    };
  }
  render() {
    return
  }
}

export default App;
