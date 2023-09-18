const itemModel = require('../schemas/items');

let createFilterStatus = (currentStatus) => {
    let statusFilter = [
        {name: 'All', value: 'all', count: 1, link: '#', class: 'default'},
        {name: 'Active', value: 'active', count: 2, link: '#', class: 'default'},
        {name: 'InActive', value: 'inactive', count: 3, link: '#', class: 'default'},
      ];
    
      statusFilter.forEach((item, index) => {
        let condition = {};
        if(item.value !== "all"){
          condition = {status: item.value};
        } 
        if(item.value === currentStatus) {
          statusFilter[index].class = 'success';
        }
        itemModel.count(condition).then( (data) => {
          statusFilter[index].count = data;
        });
      });

      return statusFilter;
}

module.exports = {
    createFilterStatus: createFilterStatus,
}