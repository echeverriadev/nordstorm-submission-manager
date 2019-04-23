import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TabMenu from './TabMenu';
import Layaout from './Layaout';
import { getItemsApi, patchItemApi } from '../../../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 0,
            rows: [],
            total: 0,
            offset: 0,
            filter: {
              cycleId: "",
              divisionId: "",
              search: "",
            },
            cannedFilters: []
        };

    }

    handleTabChange = (event, value) => {
      this.setState({ value });
    }

    onChange = (index, key, value) => {
        const rows = this.state.rows
        const row = rows[index]
        row[key] = value
        rows.splice(index, 1, row)
        this.setState({rows}, this.fetchPatchItemApi(row.id, key, value) )
    }

    fetchPatchItemApi = (id, key, value) => {
      console.log(id, key, value)
      patchItemApi(id,key,value).then(response => {
        if (response.status === 200)
          console.log(response)
      }, err => {
        console.log(err)
      })
    }

    changePagination = (offset) => {
      this.setState({offset}, this.fetchItemsApi)
    }

    changeFilter = ({target}) => {
      const filter = {...this.state.filter}
      filter[target.name] = target.value
      this.setState({
        filter
      }, this.fetchItemsApi)
    }

    addCannedFilter = (value) => {
      let cannedFilters = [...this.state.cannedFilters]
      cannedFilters.push(value)
      this.setState({
        cannedFilters
      }, this.fetchItemsApi)
    }

    removeCannedFilter = (index) => {
      let cannedFilters = [...this.state.cannedFilters]
      cannedFilters.splice(index, 1)
      this.setState({
        cannedFilters
      }, this.fetchItemsApi)
    }

    fetchItemsApi = () => {
      const {offset, filter} = this.state
      const {divisionId, cycleId} = filter
      if(divisionId && cycleId){
        const limit = 10
        const end = (limit - 1) + offset
        const parseCannedFilters = this.parseCannedFilters()
        const parsedFilter = {
          ...filter, //object
          parseCannedFilters //array of string
        }
        getItemsApi(offset, end, parsedFilter).then(response => {
          console.log(response)
          if (response.status === 200)
            this.setState({
              rows: response.data,
              total: response.total
            })
        }, err => {
          console.log(err)
        })
      }
    }


    /*Parse array of cannedFilters to an array of strings like this:
        [where1, where2, where3,...]
    */
    parseCannedFilters = () => {
      const { cannedFilters } = this.state
      let parsedFilters = []
      for(let filter of cannedFilters)
        parsedFilters.push(filter.where)
      return parsedFilters
    }



    render() {
        const { value, rows, total, offset, filter, cannedFilters } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                 <TabMenu value={value} handleChange={this.handleTabChange}/>
                {value === 0 &&
                  <Layaout
                    items={rows}
                    total={total}
                    offset={offset}
                    cannedFilters={cannedFilters}
                    filter={filter}
                    onChange={this.onChange}
                    onChangePagination = {this.changePagination}
                    onChangeFilter = {this.changeFilter}
                    onAddCannedFilter = {this.addCannedFilter}
                    onRemoveCannedFilter = {this.removeCannedFilter}
                  />
                }
                {value === 1 && <h1>SAMPLE</h1>}
            </div>

        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
