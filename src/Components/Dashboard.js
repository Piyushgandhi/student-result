import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom'
import '../App.css';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  cardarea: {
    padding: '10px'
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAlphaSort = this.handleAlphaSort.bind(this);
    this.handleScoreSort = this.handleScoreSort.bind(this);
    this.state = {
      value: '',
      alpha: '',
      score: '',
    }
  }

  handleSearch(event) {
    this.setState({ value: event.target.value });
  }

  handleAlphaSort() {
    const { alpha } = this.state;
    if (alpha === 'reverse' || alpha === '') {
      this.setState({ alpha: 'alpha', score: '' });
    }
    else {
      this.setState({ alpha: 'reverse', score: '' });
    }
  }

  handleScoreSort() {
    const { score } = this.state;
    if (score === 'reverse' || score === '') {
      this.setState({ score: 'score', alpha: '' });
    }
    else {
      this.setState({ score: 'reverse', alpha: '' });
    }
  }


  render() {
    const { value, alpha, score } = this.state;
    const { studentsData, classes } = this.props;
    var regex = new RegExp('^' + value, "i");
    var data = Object.entries(studentsData);
    if(alpha === 'alpha') {
      data = data.sort((a, b) => {
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if(alpha === 'reverse') {
      data = Object.entries(studentsData).sort((a, b) => {
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if(score === 'score') {
      data = Object.entries(studentsData).sort((a, b) =>
        Object.values(a[1].marks).reduce((sum, mark) => sum + mark)
        - Object.values(b[1].marks).reduce((sum, mark) => sum + mark)
      )
    }
    if(score === 'reverse') {
      data = Object.entries(studentsData).sort((a, b) =>
        Object.values(b[1].marks).reduce((sum, mark) => sum + mark)
        - Object.values(a[1].marks).reduce((sum, mark) => sum + mark)
      )
    }

    return (
      <div className="dashboard">
        <div className="appbar">
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Dashboard
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={value}
                  onChange={this.handleSearch}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <Button
                onClick={this.handleAlphaSort}
                color="inherit"
                className="classes.button"
              >Name</Button>
              <Button
                onClick={this.handleScoreSort}
                color="inherit"
                className="classes.button"
              >Marks</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className="grid">
          {
            data.map((student) => {
              return (regex.test(student[1].name) &&
                <Card className="card" key={student[1].rollNo}>
                  <Link className='link' to={`/${student[1].rollNo}`} >
                    <CardActionArea className={classes.cardarea}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {student[1].name}
                      </Typography>
                      <Typography component="p">
                        Roll No: {student[1].rollNo}
                      </Typography>
                      <Typography component="p">
                        Total marks: {
                          Object.values(student[1].marks).reduce((sum, mark) => sum + mark)
                        }
                      </Typography>
                    </CardActionArea>
                  </Link>
                </Card>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);