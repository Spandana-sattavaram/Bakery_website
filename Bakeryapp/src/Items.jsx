import React from 'react';
import { Link } from 'react-router-dom';
import './items.css'

function Items() {
  const items = [
    { name: "Cakes", link: "/cakes",src:"Butterscotch.png" },
    { name: "Croissants", link: "/croissants",src:"Buttercroissant.png" },
    { name: "Cookies", link: "/cookies",src:"Buttercookie.png" },
    { name: "Doughnuts", link: "/doughnut",src:"Glazeddoughnuts.png" },
  ];

  return (
    <div className="items-container">
      {items.map((item, index) => (
        <Card key={index} myarr={item} />
      ))}
    </div>
  );
}

function Card({ myarr }) {
  return (
    <div className='card'>
      <img 
        src={myarr.src} 
        alt={myarr.name} 
        className='image' 
      />
      <p className='name'>{myarr.name}</p>
      <Link to={myarr.link}>
        <button className='order'>View more</button>
      </Link>
    </div>
  );
}

export default Items;