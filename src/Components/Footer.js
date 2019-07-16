import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  footer: {
    backgroundColor: "grey",
    color: "white",
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function Footer(props) {
    const { classes } = props;
    return (
      <footer className={classes.footer}>
        <Typography variant="title" align="center" color="inherit" gutterBottom>
          ShotLink Data Visualization
        </Typography>
        <Typography variant="subheading" align="center" color="inherit" component="p">
          Created by Benedict Brady
        </Typography>
      </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
