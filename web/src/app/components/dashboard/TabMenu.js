import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8",
    backgroundColor: "#fafafa"
  },
  tabsIndicator: {
    backgroundColor: "#79a0c3"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: "500",
    fontSize: "13.9px",
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#7b7b7b",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#85a2bc",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing(3)
  }
});

const TabMenu = ({ value, handleChange, classes }) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
    >
      <Tab
        disableRipple
        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
        label="SUBMISSIONS"
      />
    </Tabs>
  );
};

export default withStyles(styles, { withTheme: true })(TabMenu);
