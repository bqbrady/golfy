import React, { Component, Fragment } from 'react';
import * as coinbase from "coinbase";
import * as axios from "axios";


const getPrice = function() {
   var my = {
      key: '1f3033f6dd1db19141a8c6ca5003398d',
      secret: 'YhvGP+qE/cZWwEtFW4CGpyyhhpelEAPcBz3VY0FUDjE/aROur2Av+NnNJNb77n5Zp7LNnyKJn3iLpVG+0L3Tgg=='
   };
   return axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD")
        .then(response => {
          // flattening the response
          this.top = response.data.map(item => {
             amount: item.amount,
          })
        })
}

export default {
   PriceAPI: PriceAPI
}
