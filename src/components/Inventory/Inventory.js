import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import ItemCtrl from './ItemCtrl';
import AddProduct from './AddProduct';
import RemoveProduct from './RemoveProduct';

// document.location.host
// we can use this in the io url if we get the project hosted,
//this will automatically find the hosted url and put it in

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            prodArray: []
        };
        this.database = []
        this.productsArray= []
        this.addComponent = ""
        this.removeComponent = ""
    };

    componentDidMount() {
        axios.get('http://localhost:3002/inventory').then((res) => {
            console.log(res);

            this.database = res.data.sort((a,b)=>a.productid > b.productid).map(row => (
                <ItemCtrl key={row.productid} id={row.productid} pName={row.productname} qAmt={row.quantity}/>
            ));

            //prodcuts array for AddProduct and RemoveProduct

            this.productsArray = res.data.map(row=>row.productname);

            this.addComponent = <AddProduct products={this.productsArray} />;
            this.removeComponent = <RemoveProduct products={this.productsArray} />;

            this.setState({
              inventory: this.database,
              prodArray: this.productsArray
            });
            let socket = io(document.location.protocol + '//localhost:3003');
            socket.on('connected', (data) => {
                console.log('client connected');
                socket.emit('ready for data', {});
            });

            socket.on('update', (data) => {
              console.log(data)
              axios.get('http://localhost:3002/inventory').then((res) => {
                  console.log(res + "    in the update");

                  this.database = res.data.sort((a,b)=>a.productid > b.productid).map((row) => (
                      <ItemCtrl key={row.productid} id={row.productid} pName={row.productname} qAmt={row.quantity}/>
                  ));
                  this.productsArray = res.data.map(row=>row.productname);
                  this.setState({inventory: this.database,prodArray: this.productsArray});
                  this.database = res.data.sort((a,b)=>a.productid > b.productid).map(row => (
                      <ItemCtrl key={row.productid} id={row.productid} pName={row.productname} qAmt={row.quantity}/>
                  ));
                  this.addComponent = <AddProduct products={this.productsArray} />;
                  this.removeComponent = <RemoveProduct products={this.productsArray} />;
            });
});
        });
    }

    render() {
        const styles = this.getStyles();
        return (
            <div>
              <div style={styles.inventoryHeader}>
                <div style={styles.headerPro}>
                  <h3>Product</h3>
                </div>
                <div style={styles.headerQua}>
                  <h3>Quantity</h3>
                </div>
              </div>
              {/* End div for inventory header. */}

              <div>
                {this.database}
              </div>
              {/* End div for dynamically updated inventory. */}

             {/* BEGIN AddProduct Component */}
             {this.addComponent}
             {/* END AddProduct Component */}

             {/* BEGIN RemoveProduct Component */}
             {this.removeComponent}
             {/* END RemoveProduct Component */}

            </div>
        )
    }

    getStyles() {
      return {
        inventoryHeader: {
          display: "flex",
          width: "55%",
          margin: "0 auto",
          textAlign: "center"
        },
        headerPro: {
          borderBottom: "4px solid black",
          borderRight: "2px solid black",
          paddingBottom: "0px",
          flex: 1,
        },
        headerQua: {
          borderBottom: "4px solid black",
          paddingBottom: "0px",
          flex: 2,
        }
      }
    }
}
