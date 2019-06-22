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
  getDivisionsApi,
  deleteItemApi,
  duplicateItemApi,
  addItemLog
} from '../../../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const initialNewItem = {
  nmg_priority: 0,
  department_number: "",
  vpn: "",
  brand: "",
  color: "",
  size: "",
  description: "",
  image: null,
  style_group_number: "",
  in_stock_week: "",
  sale_price: "",
  //EXTRA
  category: [],
  _fk_cycle: null,
  retail_price: null,
  is_priority: null,
  available_in_canada: null,
  price_cad: null,
  country_of_origin: "",
  country_of_origin_other: "",
  request_extension: null,
  request_extension_note: "",
  request_cancellation: null,
  request_cancellation_notes: "",
  tagged_missy: 0,
  tagged_encore: 0,
  tagged_petite: 0,
  tagged_extended: 0
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

    onSubmit = () => {
      const {filter, addItem} = this.state
      const {divisionId, cycleId} = filter
      const addItemApi = {
        ...addItem,
        _fk_division: divisionId,
        _fk_cycle: cycleId
      }
      storeItemApi(addItemApi).then(response => {
        if(response.code === 200){
          this.setState({
            addItem: initialNewItem
          });
          this.fetchItemsApi()
          // alert(response.message);
        }else{
          console.error(response.message)
        }
        console.log(response)
      }, err => {
        console.error(err)
      } )
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
        if (response.refresh){
          this.fetchItemsApi() 
        }
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
        filter,
        offset: 0,
        isChangingFilter: true
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
        console.log(filter)
        const parsedFilter = {
          ...filter, //object
          parseCannedFilters //array of string
        }
        getItemsApi(offset, end, parsedFilter, orderString).then(response => {
          console.log(response)
          if (response.status === 200)
            this.setState({
              isChangingFilter: false,
              rows: response.data,
              total: response.total
            })
          else
            this.setState({isChangingFilter: false})
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

    handleDeleteItemApi = (id) => {
      deleteItemApi(id).then(response => {
        console.log('response delete', response);
        if (response.status === 200)
          this.fetchItemsApi()
      }, err => {
        console.log(err)
      })
    }
    
    handleDuplicateItemApi = (id) => {
      duplicateItemApi(id).then(response => {
        console.log('response duplicate', response);
        if (response.status === 200){
          this.fetchItemsApi()
        }
      }, err => {
        console.log(err)
      })
    }

    render() {
        const { value, cycles, divisions, rows, addItem,
              total, offset, filter, cannedFilters, order, isChangingFilter } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
              <PrimaryAppBar />
              <TabMenu value={value} handleChange={this.handleTabChange}/>
                {value === 0 &&
                  <Layaout
                    isChangingFilter={isChangingFilter}
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
                    onRefreshItems = {this.fetchItemsApi}
                    onDeleteItem = {this.handleDeleteItemApi}
                    onDuplicateItem = {this.handleDuplicateItemApi}
                  />
                }
                {value === 1 && <h1>SAMPLE</h1>}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
