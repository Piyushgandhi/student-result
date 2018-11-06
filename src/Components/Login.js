import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  card: {
    width: 300,
    padding: '5%',
    margin: 'auto',
    marginTop: '10%',
  },
  button: {
    marginTop: 10,
    float: 'right',
  },
  login: {
    textAlign: 'center',
  },
})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { cookies } = this.props;
    const { email } = this.state;
    cookies.set( 'email', email, { path: '/' });
    console.log(cookies);
  }

  render() {
    const { classes, cookies } = this.props;
    if(!cookies.cookies.email) {
    return (
      <div className='login'>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <Typography variant="h5" className={classes.login}>Login</Typography>
            <TextField
              onChange={(event) => this.setState({email: event.target.value})}
              value={this.state.email}
              required
              id="standard-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              autoComplete="current-password"
              margin="normal"
            /><br />
            <TextField
              onChange={(event) => this.setState({password: event.target.value})}
              value={this.state.password}
              required
              id="standard-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <br />
            <Button className={classes.button} type="submit" variant="contained" color="primary">Login</Button>
          </form>
        </Card>
      </div>
    )}
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
