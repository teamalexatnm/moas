import React, {Component} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// document.location.host
// we can use this in the io url if we get the project hosted,
//this will automatically find the hosted url and put it in

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: []
        };
    };

    componentDidMount() {
        axios.get('http://localhost:3002/inventory').then((res) => {
            console.log(res);
            const database = res.data.map((row) => (
                <div>
                    {row.productid}, {row.productname}, {row.quantity}
                </div>
            ));
            this.setState({inventory: database});
            let socket = io(document.location.protocol + '//localhost:3003');
            socket.on('connected', (data) => {
                console.log('client connected');
                socket.emit('ready for data', {});
            });
            socket.on('update', (data) => {
              location.reload();
                this.setState({inventory: data.message.payload});
            });

        });
    }

    render() {
        return (
            <div>
                {this.state.inventory}
            </div>
        )
    }
}
