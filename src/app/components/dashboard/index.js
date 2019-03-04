import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TabMenu from './TabMenu';
import Layaout from './Layaout';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});

let id = 0;
function createData(priority, dept, vpn, sg, brand, color, size, description, stock, price) {
  id += 1;
  const category = ['category: example1', 'category: example2']
  return {
    id,
    priority,
    dept,
    vpn,
    sg,
    brand,
    color,
    size,
    description,
    stock,
    price,
    category,
    cycle: 1,
    annSalePrice: 123,
    productPriority: "normal",
    availableInCanada: true,
    canadaPrice: 123,
    countryOrigin: "USA",
    specifyCountry: "USA",
    requestExtension: true,
    extensionReason: "sample",
    requestCancelation: false,
    cancelationReason: "",
    departament: "Via C"
  };
}

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 0,
            rows: [
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
              createData(1, "123", "10.0.0.0", "SG", "Asus", "gray", "15'", "Laptop", 1, 300.0),
              createData(2, "456", "10.0.0.1", "SG", "Motorola", "black", "8'", "Modem", 1, 30.0),
            ]
        };

        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, value){
      this.setState({ value });
    }

    onChange = (index, key, value) => {
        const rows = this.state.rows
        const row = rows[index]

        row[key] = value

        rows.splice(index, 1, row)

        this.setState({rows})
    }

    render() {
        const { value, rows } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                 <TabMenu value={value} handleChange={this.handleTabChange}/>
                {value === 0 && <Layaout items={rows} onChange={this.onChange}/>}
                {value === 1 && <h1>SAMPLE</h1>}
            </div>

        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
