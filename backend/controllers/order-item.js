'use strict';
let OrderItems = require('../models/orderItems');
let console = require('console');

module.exports = {
    saveItems: function (items, callback) {
        //console.log(" Hi this is Order Item");
        items.forEach((data) => {
            //console.log(data, ' :: In For Each Loop');
            let orderItem = new OrderItems(data);
            orderItem.save(data, (err, item) => {
                if (err) {
                    console.log(err.message);
                }
                //console.log(item, ' In Saved Call back');
                callback(item);
            });
        });
    }
};