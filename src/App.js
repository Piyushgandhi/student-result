import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details'
import loader from './Images/loader.gif'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      studentsData: []
    };
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/1dlper")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            studentsData: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, studentsData } = this.state;
    if (error) {
      return <div className="error">Error</div>
    }
    else if (!isLoaded) {
      return <div className="loading"><img src={loader} alt='loading...' /></div>
    }
    else {
      return (
        <div className="dashboard">
          <Switch>
              <Route exact path="/" component={() => <Dashboard studentsData={studentsData} />} />
              <Route exact path="/:id" render={(routeProps) => <Details {...routeProps} studentsData={studentsData} />} />
          </Switch>
        </div>
      )
    }
  }match
}

export default App;
