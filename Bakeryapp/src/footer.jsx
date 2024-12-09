import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

import './footer.css';

const Footer = () => {
  return (
    
    <footer className="footer">
        <hr />
      <div className="footer-content">
        <div className="footer-section about">
          <img src="https://img.freepik.com/premium-vector/bakery-logo-design_260747-392.jpg"/>
        </div>
        <div className="footer-section contact">
          <h2 className="info">Contact Us</h2>
          <p className="info1">Email: info@randombakers.com</p>
          <p className="info1">Phone: +123 456 7890</p>
          <p className="info1">Address: Random Bakers, Post Khamaria, Jabalpur, Madhya Pradesh 482005</p>
        </div>
        <div className="footer-section">
            <h2>Follow Us</h2>
            <div className="iconfooter">
                <span className="icon1"><InstagramIcon></InstagramIcon></span>
                <span className="icon2"><WhatsAppIcon></WhatsAppIcon></span>
                <span className="icon3"><FacebookIcon></FacebookIcon></span>
            </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Random Bakers 
      </div>
    </footer>
  );
}

export default Footer;