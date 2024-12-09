import React from 'react';
import './delivery.css';

const DeliveryInfo=()=>{
    return(
        [
            <div className="delivery">
                <h1 className="main-heading">Delivery Info</h1>
                <p>Order Placement:</p>
                <ul>
                    <li>No Orders will be taken after 8 pm on any given day. </li>
                </ul>
                <p>Menu Availability:</p>
                <ul>
                    <li>All menu items listed on the website are available for delivery.</li>
                </ul>
                <p>Delivery Fee:</p>
                <ul>
                    <li>Delivery fee charged based on distance from the bakery.</li>
                </ul>
                <p>Terms & Conditions:</p>
                <ul>
                    <li>Customers are responsible for providing accurate delivery address and contact information.</li>
                    <li>Orders will be delivered within a specified timeframe, communicated upon order confirmation.</li>
                    <li>Changes or cancellations must be made within a specified timeframe, subject to terms and conditions.</li>
                </ul>
                <p>Customer Supprot:</p>
                <ul>
                    <li>Contact customer support for any inquiries or assistance regarding delivery orders.</li>
                </ul><br/>
                <p>Thank you for choosing the Random Bakers.</p><br/>
            </div>
        ]
    )
}

export default DeliveryInfo;