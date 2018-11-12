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
import { setUser, setSort, setSearchText } from '../Actions/action';
import '../App.css';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = theme => createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
  },
  cardarea: {
    padding: 10,
  },
  infoText: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '6%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      snackbar: false,
      vertical: 'bottom',
      horizontal: 'center',
      message: '',
    }
  }

  handleChange(event) {
    this.setState({ sort: event.target.value });
    console.log(event.target.value);
  }

  handleSearch(event) {
    this.props.setSearchText(event.target.value);
  }

  handleSort(event) {
    const { sortType, setSort } = this.props;
    if (event.currentTarget.value === 'name') {
      if (sortType === 'aToz') {
        this.setState({ snackbar: true, message: 'Sorted in reverse alphabetical order' });
        this.props.setSort('zToa');
      }
      else {
        this.setState({ snackbar: true, message: 'Sorted in alphabetical order' });
        this.props.setSort('aToz');
      }
    }
    if (event.currentTarget.value === 'marks') {
      if (sortType === 'lowToHigh') {
        this.setState({ snackbar: true, message: 'Sorted by marks high to low' });
        setSort('highToLow');
      }
      else {
        this.setState({ snackbar: true, message: 'Sorted by marks low to high' });
        setSort('lowToHigh');
      }
    }
    setTimeout(() => this.setState({ snackbar: false }), 2000);
  }

  renderRedirect = () => {
    return <Redirect to='/login' />
  }

  render() {
    const { snackbar, vertical, horizontal, message } = this.state;
    const { studentsData, classes, cookies, setCurrentStudent, sortType, searchText } = this.props;
    var regex = new RegExp('^' + searchText, "i");
    var data = Object.entries(studentsData);
    if (sortType === 'aToz') {
      data = data.sort((a, b) => {
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() < b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if (sortType === 'zToa') {
      data = Object.entries(studentsData).sort((a, b) => {
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return -1;
        if (a[1].name.toUpperCase() > b[1].name.toUpperCase())
          return 1;
        return 0;
      });
    }
    else if (sortType === 'lowToHigh') {
      data = Object.entries(studentsData).sort((a, b) =>
        Object.values(a[1].marks).reduce((sum, mark) => sum + mark)
        - Object.values(b[1].marks).reduce((sum, mark) => sum + mark)
      )
    }
    else if (sortType === 'highToLow') {
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
                    value={searchText}
                    onChange={this.handleSearch}
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
                <Typography color="inherit" >Sort:</Typography>
                <Button
                  size="small"
                  value="name"
                  color="inherit"
                  onClick={this.handleSort}
                  className="classes.button"
                >Name</Button>
                <Button
                  size="small"
                  value="marks"
                  onClick={this.handleSort}
                  color="inherit"
                  className="classes.button"
                >Marks</Button>
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
    sortType: state.sortType,
    cookies: ownProps.cookies,
    searchText: state.searchText,
  })
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentStudent: (id) => dispatch(setUser(id)),
  setSort: (sort) => dispatch(setSort(sort)),
  setSearchText: (text) => dispatch(setSearchText(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
