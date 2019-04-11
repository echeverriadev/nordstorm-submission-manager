import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    backgroundColor: "#ededed",
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
  },
  head: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  title: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontWeight: 'bold',
  }
});


const CenteredGrid = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <Grid container className={classes.head}>
            <Grid item md={1}/>
            <Grid item md={11}>
              <Grid container>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">NMG Priority</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">Dept.#</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">VPN</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">SG#</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">Brand</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">Color</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">Sample Size</Typography>
                  </Grid>
                  <Grid item md={2}>
                  <Typography align="left" className={classes.title} variant="body2">Item Description</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">In Stock Week</Typography>
                  </Grid>
                  <Grid item md={1}>
                  <Typography align="left" className={classes.title} variant="body2">Retail Price</Typography>
                  </Grid>
                  <Grid item md={1}/>
              </Grid>
            </Grid>
        </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);