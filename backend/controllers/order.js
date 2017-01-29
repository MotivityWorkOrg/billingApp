'use strict';
let Order = require('../models/order');
let itemController = require('./order-item');
let console = require('console');
function getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (month.toString().length === 1) {
        month = '0' + month;
    }
    if (day.toString().length === 1) {
        day = '0' + day;
    }
    if (hour.toString().length === 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length === 1) {
        minute = '0' + minute;
    }
    if (second.toString().length === 1) {
        second = '0' + second;
    }
    return 'VS' + year + month + day + hour + minute + second;
}

module.exports = {
    createOrder: function (req, res) {
        console.log(req.body, ' << ::: >> ');
        let items = [];
        let discount = req.body.discount;
        console.log(req.body.items, ' << :: items :: >> ');
        let checkedItems = req.body.items;
        checkedItems.forEach((data) => {
            let item = {};
            item.name = data.itemName;
            item.quantity = data.numberOfOrders;
            item.total = Number(data.price) * Number(data.numberOfOrders);
            items.push(item);
            console.log(' Inside Callback Function ', item);
        });
        console.log(items, ' ::: :::');

        let orderTotal = items.reduce(function (pre, item) {
            return pre + item.total;
        }, 0);
        let discountTotal = 0.0;
        let afterDiscTotal = 0.0;
        if (discount !== undefined) {
            discountTotal = Math.round((Number(discount) * orderTotal) / 100);
            afterDiscTotal = Math.round(orderTotal - discountTotal);
        }
        else {
            afterDiscTotal = orderTotal;
        }

        console.log(discount, '  ', orderTotal, '  ### ', discountTotal, " Total Order Price :::: ", orderTotal);
        let savedOrderItems = [];
        itemController.saveItems(items, function (savedItem) {
            savedOrderItems.push(savedItem);
            //console.log(savedOrderItems, ' @@@@@@@');
            if (savedOrderItems.length === checkedItems.length) {
                let order = {};
                order._id = getDateTime();
                order.items = savedOrderItems;
                order.discount = discount;
                order.discountTotal = discountTotal;
                order.total = orderTotal;
                order.subTotal = afterDiscTotal;
                order.username = req.body.username;
                order.store = req.body.store;
                order.paymentMethod = req.body.paymentMethod;
                let saveOrder = new Order(order);
                //console.log(order, ' ::::: <<<< >>>> ::::', savedOrderItems);
                saveOrder.save(order, (err, order) => {
                    if (err) {
                        res.send(err.message);
                    }
                    res.send(order);
                });
            }
        });
        //console.log(savedOrderItems.length, '  ===  ', checkedItems.length);
    },
    getOrders: function (req, res) {
        console.log(req, res);
    }
};
