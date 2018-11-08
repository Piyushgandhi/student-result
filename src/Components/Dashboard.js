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
import { Link, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { setUser } from '../Actions/action';
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
  grow: {
    flexGrow: 1,
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
      width: 140,
      '&:focus': {
        width: 200,
      },
    },
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  cardarea: {
    padding: 10,
  },
  infoText: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '6%',
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      value: '',
      snackbar: false,
      vertical: 'bottom',
      horizontal: 'center',
      message: '',
      sort: '',
    }
  }

  handleChange(event) {
    this.setState({ sort: event.target.value });
    console.log(event.target.value);
  }

  handleSearch(event) {
    this.setState({ value: event.target.value });
  }

  handleSort(event) {
    if(event.currentTarget.value === 'aToz') {
    this.setState({ sort: event.currentTarget.value, snackbar: true, message: 'Sorted in alphabetical order' });
    }
    else if(event.currentTarget.value === 'zToa') {
    this.setState({ sort: event.currentTarget.value, snackbar: true, message: 'Sorted in reverse alphabetical order' });
    }
    else if(event.currentTarget.value === 'lowToHigh') {
      this.setState({ sort: event.currentTarget.value, snackbar: true, message: 'Sorted by marks low to high' });
    }
    else if(event.currentTarget.value === 'highToLow') {
      this.setState({ sort: event.currentTarget.value, snackbar: true, message: 'Sorted by marks high to low' });
    }
    setTimeout(() => this.setState({ snackbar: false }), 2000);
  }

  renderRedirect = () => {
    return <Redirect to='/login' />
  }

  render() {
    const { value, snackbar, vertical, horizontal, message, sort } = this.state;
    const { studentsData, classes, cookies, setCurrentStudent } = this.props;
    var regex = new RegExp('^' + value, "i");
    var data = Object.entries(studentsData);
    if (sort === 'aToz') {
      data = data.sort((a, b) => {
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if (sort === 'zToa') {
      data = Object.entries(studentsData).sort((a, b) => {
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if (sort === 'lowToHigh') {
      data = Object.entries(studentsData).sort((a, b) =>
        Object.values(a[1].marks).reduce((sum, mark) => sum + mark)
        - Object.values(b[1].marks).reduce((sum, mark) => sum + mark)
      )
    }
    if (sort === 'highToLow') {
      data = Object.entries(studentsData).sort((a, b) =>
        Object.values(b[1].marks).reduce((sum, mark) => sum + mark)
        - Object.values(a[1].marks).reduce((sum, mark) => sum + mark)
      )
    }
    if (cookies.get('email')) {
      return (
        <div className="dashboard">
          <div className="appbar">
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  Dashboard
              </Typography>
                <div className={classes.grow} />
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
                <Typography color="inherit">Sort: </Typography>
                <Button
                  value="aToz"
                  onClick={this.handleSort}
                  color="inherit"
                  className="classes.button"
                >Name A-Z</Button>
                <Button
                  value="zToa"
                  onClick={this.handleSort}
                  color="inherit"
                  className="classes.button"
                >Name Z-A</Button>
                <Button
                  value="lowToHigh"
                  onClick={this.handleSort}
                  color="inherit"
                  className="classes.button"
                >Marks Low-High</Button>
                <Button
                  value="highToLow"
                  onClick={this.handleSort}
                  color="inherit"
                  className="classes.button"
                >Marks High-Low</Button>
              </Toolbar>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
              />
            </AppBar>
          </div>
          <div className="grid">
            {
              data = data.map((student) => {
                return (regex.test(student[1].name) &&
                  <Card className="card" key={student[1].rollNo}>
                    <CardActionArea onClick={() => setCurrentStudent(student[1].rollNo)} component={Link} to={`/${student[1].rollNo}`} className={classes.cardarea}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {student[1].name}
                      </Typography>
                      <div className={classes.infoText}>
                        <Typography component="p">
                          Roll No: {student[1].rollNo}
                        </Typography>
                        <Typography component="p">
                          Total marks: {
                            Object.values(student[1].marks).reduce((sum, mark) => sum + mark)
                          }
                        </Typography>
                      </div>
                    </CardActionArea>
                  </Card>
                )
              })
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <Redirect to='/login' />
      )
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return ({
  studentsData: state.fetchData,
  id: state.currentUser,
  cookies: ownProps.cookies
})}

const mapDispatchToProps = (dispatch) => ({
  setCurrentStudent: (id) => dispatch(setUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Dashboard));
