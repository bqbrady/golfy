import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  toolbarMain: {
    borderBottom: '3px solid white',
  },
  toolbarSecondary: {
   justifyContent: 'space-evenly',
  }
});

const sections = [
  'Home',
  'Course Layout',
  'Sign Up',
  'Crypto'
];

function Header(props) {
  var urls = {
      "Home": "/",
      "Course Layout": "/courses",
      "Sign Up": "/signup",
      "Crypto": "/crypto"
  }

  const { classes } = props;
  return (
    <div  className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbarMain}>
          <Typography
            variant="title"
            color="inherit"
            align="center"
            className={classes.flex}>
            Dashboard
          </Typography>
        </Toolbar>
        <Toolbar variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Button size="small" color="inherit" href={urls[section]}>
              {section}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
