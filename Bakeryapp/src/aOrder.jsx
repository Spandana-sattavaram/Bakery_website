import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './orderhistory.css';
import { useNavigate } from 'react-router-dom';  // For navigation

export default function AOrder() {

  const [data, update] = useState([]);
  const navigate = useNavigate();   // Initialize navigate for programmatic navigation
  
   

  // Fetch order history when userId is available
  useEffect(() => {
   
      fetch(`http://localhost:8080/orderhistory`)
        .then(res => res.json())
        .then(data => {
          console.log("Fetched data:", data); // Debug fetched data
          update(data);
        })
        .catch(err => console.log(err));
    
  }, []);

  // Function to handle order click
  const handleOrderClick = (orderId) => {
    navigate('/aOrdered', { state: { orderId } });  // Pass orderId in state (not URL)
  };

  // Function to format the date-time to IST
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the date string
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata', // Adjust to IST
    }).format(date);
  };

  return (
    <>
      <h1>Order History</h1>
      <br /><br />
      <TableContainer component={Paper} sx={{ width: 1200, margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead id="tablehead">
            <TableRow sx={{ backgroundColor: "grey" }}>
              <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Total</TableCell>
              <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell align="center" sx={{ fontSize: '20px', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.order_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontSize: '17px' }}>{row.order_id}</TableCell>
                  <TableCell sx={{ fontSize: '17px' }}>{formatDate(row.order_datetime)}</TableCell>
                  <TableCell sx={{ fontSize: '17px' }}>{row.total}</TableCell>
                  <TableCell sx={{ fontSize: '17px' }}>{row.quantity}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      sx={{ fontSize: '16px', textTransform: 'none', color: '#3f51b5' }}
                      onClick={() => handleOrderClick(row.order_id)}  // Handle click
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}