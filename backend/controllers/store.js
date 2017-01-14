'use strict';
let Store = require('../models/store');
let Address = require('../models/address');
let StoreStaticData = require('../staticDB/storeData');
let console = require('console');


function handleError(res, err) {
    return res.send(500, err);
}

module.exports = {
    addStore: function (req, res) {
        req.body.address.addressType = "Store";
        let address = new Address(req.body.address);
        address.save(req.body.address, (err, address) => {
            if (err) {
                console.log(err.message);
            }
            req.body.storeAddress = address;
            delete req.body.address;
            //console.log(req.body);
            let store = new Store(req.body);
            store.save(req.body, (err, store) => {
                if (err) {
                    console.log('Error coming from Store :::   ', err.message);
                    res.send(err.message);
                }
                res.send(store);
            });
        });
    },
    getAllStores: function (req, res) {
        Store.find({}).sort({
                create: -1
            })
            .exec(function (err, stores) {
                if (err) {
                    return handleError(res, err);
                }
                if (!stores) {
                    console.log("falskfjlasf");
                    return res.send(404);
                }
                if (stores.length === 0) {
                    let storeInfo = StoreStaticData.getStoreDetails();
                    let add = StoreStaticData.getStoreAddress();
                    let address = new Address(add);
                    address.save((err, address) => {
                        if (err) {
                            console.log(err);
                        }
                        storeInfo.storeAddress = address;
                        console.log(" coming stores ", storeInfo);
                        let store = new Store(storeInfo);
                        store.save((err, store) => {
                            if (err) {
                                console.log("store save error");
                            }
                            stores = store;
                        });
                    });
                }
                //console.log(" coming stores ", storeInfo);
                return res.send(stores);
            });
    }
};

