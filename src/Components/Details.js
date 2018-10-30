import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 50,
  },
  media: {
    height: 140,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  link: {
    textDecoration: 'none',
  }
};


class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, studentsData, match } = this.props;
    var id = match.params.id;
    if(studentsData[id])
    return (
      <div>
        <Card className={classes.card} >
          <CardContent>
            <div className={classes.text} >
              <Typography variant="h4" component="h2">{studentsData[id].name}</Typography>
              <Typography component="h2">Class: {studentsData[id].class}</Typography>
              <Typography component="h2">Roll No: {studentsData[id].rollNo}</Typography>
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.entries(studentsData[id].marks).map((mark) =>
                    <TableRow key={mark[0]}>
                      <TableCell>{mark[0]}</TableCell>
                      <TableCell>{mark[1]}</TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
            <Link className={classes.link} to="/">
              <Button className={classes.button}>Back</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
    else 
    return (
      <label>Not Found</label>
    )
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details)