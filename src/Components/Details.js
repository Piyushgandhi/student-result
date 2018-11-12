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
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { connect } from 'react-redux';
import NotFound from './NotFound';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const chartConfigs = {
  type: 'column2d',// The chart type
  width: '100%', // Width of the chart
  height: '400', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration 
    "chart": {
      "xAxisName": "Subject",
      "yAxisName": "Marks",
      "theme": "fusion",
    },
    // Chart Data
    "data": []
  }
};

const styles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
  link: {
    textDecoration: 'none',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};


class Details extends Component {
  constructor(props) {
    super(props);
    this.handleGraphVisibility = this.handleGraphVisibility.bind(this);
    this.state = {
      graph: false,
    }
  }

  handleGraphVisibility() {
    const { graph } = this.state;
    this.setState({ graph: !graph })
    chartConfigs.dataSource.data = []
  }

  render() {
    const { graph } = this.state;
    const { classes, studentsData, match } = this.props;
    var id = match.params.id;
    if (studentsData[id])
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
                    Object.entries(studentsData[id].marks).map((mark) => {
                      chartConfigs.dataSource.data.push({ "label": mark[0], "value": mark[1] })
                      return (
                        <TableRow key={mark[0]}>
                          <TableCell>{mark[0]}</TableCell>
                          <TableCell>{mark[1]}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
              {
                graph &&
                <div>
                  <ReactFC {...chartConfigs} />
                </div>}
              <div className={classes.footer}>
                <Link className={classes.link} to="/">
                  <Button variant="contained" className={classes.button}>Back</Button>
                </Link>
                <Button
                  onClick={this.handleGraphVisibility}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Graph
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    else
      return (
        <NotFound />
      )
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return ({
  studentsData: state.fetchData,
})}

export default connect(mapStateToProps, null)(withStyles(styles)(Details));
