import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux'
import { addData, loadData } from './Actions/action';
import { withRouter } from 'react-router-dom';
import NotFound from './Components/NotFound';
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
    };
  }

  componentDidMount() {
    // this.props.dispatch(loadData())
    fetch("https://api.myjson.com/bins/1dlper")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.status) {
            throw result
          }
          this.props.setData(result);
          this.setState({
            isLoaded: true,
          });
        }
      ).catch(e => this.setState({ error: e }))
  }

  render() {
    const { classes, cookies } = this.props;
    const { error, isLoaded } = this.state;
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
            <Route exact path="/" component={() => <Dashboard cookies={cookies} />} />
            <Route exact path="/:id" component={Details} />
            <Route component={NotFound} />
          </Switch>
        </div>
      )
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(addData(data)),
})

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(withCookies(App))));
