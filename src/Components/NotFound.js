import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 50,
  },
  link: {
    textDecoration: 'none',
  },
  home: {
    float: 'right',
    margin: 10,
  },
})

function NotFound(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <h2>404: Not Found</h2>
        <p>The requested URL was not found in the server</p>
        <Link className={classes.link} to="/">
          <Button className={classes.home} variant="contained" color="primary">Home</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
