import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import './order.css';
import axios from 'axios';

export default function DeliveryPage() {
  const [data, Update] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [open, setOpen] = useState(false); // For order success dialog
  const [incompleteFormDialogOpen, setIncompleteFormDialogOpen] = useState(false); // For incomplete form dialog
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/order/${userId}`)
      .then(res => res.json())
      .then(data => Update(data))
      .catch(err => console.log(err));
  }, [userId]);

  let totalAmount = 0;
  let totalQuantity = 0;
 
  data.forEach(item => {
    totalAmount += item.price * item.CartQuantity;
    totalQuantity += item.CartQuantity;
  });

  const handlePlaceOrder = () => {
    if (isFormComplete) {
      setOpen(true);
    } else {
      setIncompleteFormDialogOpen(true);
    }
  };

  const handleClose = () => {
    const products = data.map(item => ({
      product_id: item.prod_id,
      quantity: item.CartQuantity,
    }));

    axios.post('http://localhost:8080/completeOrder', {
      userId,
      totalAmount,
      totalQuantity,
      products,
      address,
      city,
      state,
      pinCode,
    })
    .then(response => {
      console.log(response.data);
      navigate('/Orders'); 
      setOpen(false); 
    })
    .catch(error => {
      console.error('Error completing order:', error);
    });
    setOpen(false);
  };

  // Check if all required fields are filled
  const isFormComplete = address && city && state && pinCode;

  return (
    <>
      <h1>Place Your Order</h1>
      <div id="deliverySection">
        <div id="Delivery">
          <h2>Delivery Details</h2>
          <form className="delivery-form">
            <TextField 
              label="Address" 
              variant="outlined" 
              fullWidth 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
            />
            <TextField 
              label="City" 
              variant="outlined" 
              fullWidth 
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              select
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="Telangana">Telangana</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="MP">Madhya Pradesh</MenuItem>
              <MenuItem value="AP">Andhra Pradesh</MenuItem>
            </TextField>
            <TextField 
              label="PIN code" 
              variant="outlined" 
              fullWidth 
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div id="products">
        <TableContainer component={Paper} sx={{  position: 'absolute', top: '49%', right: '2%', width: '33%' }}>
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold'}}>Product</TableCell>
                <TableCell align="center" sx={{ fontSize: '20px', fontWeight: 'bold'}}>Quantity</TableCell>
                <TableCell align="center" sx={{ fontSize: '20px', fontWeight: 'bold'}}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '17px' }}>{item.product_name}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '17px' }}>{item.CartQuantity}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '17px' }}>{item.price * item.CartQuantity}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontSize: '18px', fontWeight: 'bold' }}>Total:</TableCell>
                <TableCell align="center" sx={{ fontSize: '18px', fontWeight: 'bold' }}>{totalQuantity}</TableCell>
                <TableCell align="center" sx={{ fontSize: '18px', fontWeight: 'bold' }}>{totalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ marginTop: '200px', textAlign: 'center' }}>
        <Button
          id="placeOrderButton"
          variant="contained"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>

      {/* Order Success Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="order-placed-title"
        aria-describedby="order-placed-description"
      >
        <DialogTitle id="order-placed-title">Order Placed</DialogTitle>
        <DialogContent>
          <DialogContentText id="order-placed-description">
            Thank you! Your order has been successfully placed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Incomplete Form Dialog */}
      <Dialog
        open={incompleteFormDialogOpen}
        onClose={() => setIncompleteFormDialogOpen(false)}
        aria-labelledby="incomplete-form-title"
        aria-describedby="incomplete-form-description"
      >
        <DialogTitle id="incomplete-form-title">Incomplete Form</DialogTitle>
        <DialogContent>
          <DialogContentText id="incomplete-form-description">
            Please fill in all required fields to proceed with your order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIncompleteFormDialogOpen(false)} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}