import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import './App.css';

const styles = theme => ({
  progress: {
    marginTop: theme.spacing.unit * 40,
    marginLeft: theme.spacing.unit * 70,
  },
});

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
    const { classes,cookies } = this.props;
    const { error, isLoaded, studentsData } = this.state;
    if (error) {
      return <div className="error">Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div className="loading">
        <CircularProgress className={classes.progress} size={100} />
      </div>
    }
    else {
      return (
        <div className="dashboard">
          <Switch>
              <Route exact path="/login" component={() => <Login cookies={cookies} />} />
              <Route exact path="/" component={() => <Dashboard studentsData={studentsData} cookies={cookies} />} />
              <Route exact path="/:id" render={(routeProps) => <Details {...routeProps} studentsData={studentsData} />} />
          </Switch>
        </div>
      )
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withCookies(App));
