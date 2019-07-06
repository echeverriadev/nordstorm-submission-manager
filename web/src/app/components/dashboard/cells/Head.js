import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    backgroundColor: "#ededed",
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
    marginTop:'30px'
  },
  head: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: '13px'
  },
  headCell: {
      display: 'flex',
    '&:hover': {
      cursor: "pointer"
    }
  }
});

const iconCriterion = {
  "ASC": "arrow_drop_up",
  "DESC": "arrow_drop_down"
}

const fieldsHeader = [
  {
   label: "NMG Priority",
   name: "nmg_priority",
   grids: 1
  },{
   label: "Dept.#",
   name: "department_number",
   grids: 1
  },{
   label: "VPN",
   name: "vpn",
   grids: 1
  },{
   label: "SG#",
   name: "style_group_number",
   grids: 1
  },{
   label: "Brand",
   name: "brand",
   grids: 1
  },{
   label: "Color",
   name: "color",
   grids: 1
  },{
   label: "Sample Size",
   name: "size",
   grids: 1
  },{
   label: "Item Description",
   name: "description",
   grids: 2
  },{
   label: "In Stock Week",
   name: "in_stock_week",
   grids: 1
  },{
   label: "Retail Price",
   name: "retail_price",
   grids: 1,
   paddingLeft:11
  },
]


const CenteredGrid = (props) => {
  const { classes, order, onChangeOrder } = props;

  return (
    <div className={classes.root}>
        <Grid container className={classes.head}>
            <Grid item md={1}/>
            <Grid item md={11}>
              <Grid container alignContent='center' alignItems="center">
                  {fieldsHeader.map((field, i) => 
                    <Grid 
                      key={i}
                      onClick={() => onChangeOrder(field.name)} 
                      item 
                      md={field.grids}
                      className={classes.headCell}
                    >
                        <div>
                            {order.field === field.name && 
                              <Icon fontSize="small">{iconCriterion[order.criterion]}</Icon>
                            }
                        </div>
                    <div style={{paddingLeft:field.paddingLeft}}>
                      <Typography align="left" className={classes.title} variant="body2">
                        {field.label}
                      </Typography>
                    </div>
                    </Grid>
                  )}
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