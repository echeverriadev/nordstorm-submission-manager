import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PrimaryAppBar from '../../components/shared/PrimaryAppBar';
import TabMenu from './TabMenu';
import Layaout from './Layaout';
import {
  getItemsApi,
  patchItemApi,
  storeItemApi,
  getCyclesApi,
  getDivisionsApi
} from '../../../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const initialNewItem = {
  is_priority: 0,
  department_number: "",
  vpn: "",
  brand: "",
  color: "",
  size: "",
  description: "",
  image: null,
  style_group_number: "",
  in_stock_week: "",
  price: "",
  //EXTRA
  category: [],
  cycle: 1,
  annSalePrice: "",
  productPriority: "",
  availableInCanada: false,
  canadaPrice: "",
  countryOrigin: "",
  specifyCountry: "",
  requestExtension: false,
  extensionReason: "",
  requestCancelation: false,
  cancelationReason: "",
  departament: ""
}

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 0,
            cycles: [],
            divisions: [],
            rows: [],
            addItem: initialNewItem,
            total: 0,
            offset: 0,
            filter: {
              cycleId: "",
              divisionId: "",
              search: "",
            },
            cannedFilters: [],
            order: {
              field: '',
              criterion: ''
            }
        };

    }

    componentWillMount = () => {
      this.fetchCyclesApi()
      this.fetchDivisionsApi()
    }

    handleTabChange = (event, value) => {
      this.setState({ value });
    }

    onAddChange = (key, value) => {
      this.setState({
        addItem: {
          ...this.state.addItem,
          [key]: value
        }
      })
    }

    onSubmit = (key) => {
      if(key.toUpperCase() === "ENTER"){
        storeItemApi(this.state.addItem).then(response => {
          if(response.code === 200){
            this.setState({
              addItem: initialNewItem
            });
            alert(response.message);
          }else{
            console.error(response.message)
          }
          console.log(response)
        }, err => {
          console.error(err)
        } )
      }
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
    
    changeOrder = (fieldClicked) => {
      const { order } = this.state
      if(order.field === fieldClicked)
        order.criterion = order.criterion === "ASC" ? "DESC" : "ASC"
      else{
        order.criterion = "ASC"
        order.field = fieldClicked
      }
      this.setState({order}, this.fetchItemsApi)
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
      const {offset, filter, order} = this.state
      const {divisionId, cycleId} = filter
      let orderString = ""
      if(order.field && order.criterion) //If they aren't empty
        orderString = Object.values(order).toString()
      console.log(orderString)
      if(divisionId && cycleId){
        const limit = 10
        const end = (limit - 1) + offset
        const parseCannedFilters = this.parseCannedFilters()
        const parsedFilter = {
          ...filter, //object
          parseCannedFilters //array of string
        }
        getItemsApi(offset, end, parsedFilter, orderString).then(response => {
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

    fetchCyclesApi = () => {
      getCyclesApi().then(response => {
        if (response.status === 200)
          this.setState({cycles: response.data})
      }, err => {
        console.log(err)
      })
    }

    fetchDivisionsApi = () => {
      getDivisionsApi().then(response => {
        if (response.status === 200)
          this.setState({divisions: response.data})
      }, err => {
        console.log(err)
      })
    }

    render() {
        const { value, cycles, divisions, rows, addItem, 
              total, offset, filter, cannedFilters, order } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
              <PrimaryAppBar />
              <TabMenu value={value} handleChange={this.handleTabChange}/>
                {value === 0 &&
                  <Layaout
                    items={rows}
                    cycles={cycles}
                    divisions={divisions}
                    addItem={addItem}
                    total={total}
                    offset={offset}
                    cannedFilters={cannedFilters}
                    filter={filter}
                    order={order}
                    onChange={this.onChange}
                    onAddChange={this.onAddChange}
                    onSubmit={this.onSubmit}
                    onChangePagination = {this.changePagination}
                    onChangeFilter = {this.changeFilter}
                    onChangeOrder = {this.changeOrder}
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
