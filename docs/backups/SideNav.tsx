
import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { MenuItem } from 'material-ui/Menu';

export interface SideNavStateProps {
  isOpen: boolean;
}

export interface SideNavDispatchProps {
  toggleDrawer: () => void;
}

export interface SideNavProps extends SideNavStateProps, SideNavDispatchProps {}

class SideNav extends React.Component<SideNavProps, any> {
  render() {
    return (
      <Drawer
        open={this.props.isOpen}
        docked={false}
        onClose={this.props.toggleDrawer}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Meal Plans</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Drawer>
    );
  }
}

export default SideNav;
