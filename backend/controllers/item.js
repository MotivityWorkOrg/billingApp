'use strict';
let Item = require('../models/item');
let console = require('console');

function handleError(res, err) {
    return res.send(500, err);
}

function getCategorized(items) {
    let categoryArray = ['JumboKing', 'Sandwich', 'Sides', 'Beverages'];
    let modifiedCategoryArray = [];
    let jkCat = {};
    jkCat.name = 'Jumbo King';
    jkCat.listItems = [];
    let sandwichCat = {};
    sandwichCat.name = 'Sandwich';
    sandwichCat.listItems = [];
    let sidesCat = {};
    sidesCat.name = 'Sides';
    sidesCat.listItems = [];
    let beveragesCat = {};
    beveragesCat.name = 'Beverages';
    beveragesCat.listItems = [];
    items.forEach((data) => {
        switch (data.category) {
            case categoryArray[0] : {
                jkCat.listItems.push(data);
                break;
            }
            case categoryArray[1]: {
                sandwichCat.listItems.push(data);
                break;
            }
            case categoryArray[2]: {
                sidesCat.listItems.push(data);
                break;
            }
            case  categoryArray[3]: {
                beveragesCat.listItems.push(data);
                break;
            }
        }
    });
    if (jkCat.listItems.length > 0)
        modifiedCategoryArray.push(jkCat);
    if (sandwichCat.listItems.length > 0)
        modifiedCategoryArray.push(sandwichCat);
    if (sidesCat.listItems.le > 0)
        modifiedCategoryArray.push(sidesCat);
    if (beveragesCat.listItems.length > 0)
        modifiedCategoryArray.push(beveragesCat);

    return modifiedCategoryArray;
}

module.exports = {
    addItem: function (req, res) {
        let addItem = req.body;
        addItem.stores = [];
        addItem.stores.push(addItem.store);
        delete addItem.store;
        let item = new Item(addItem);
        item.save(addItem, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            }
            res.send(data);
        });
    },
    getItems: function (req, res) {
        Item.find({}).sort({
            create: -1
        }).exec((err, items) => {

            if (err) {
                return handleError(res, err);
            }
            if (!items) {
                console.log("falskfjlasf");
                return res.send(404);
            }
            items = getCategorized(items);
            return res.send(items);
        });
    }
};
