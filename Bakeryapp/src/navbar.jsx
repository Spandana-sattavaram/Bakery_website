import "./navbar.css";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
function Nav()
{
    const navigate = useNavigate(); // Initialize the navigate function

    const handleAccountClick = () => {
        navigate('/profile'); // Redirect to the profile page
    };
    const handleDeliveryClick = () => {
        navigate('/delivery'); // Redirect to the profile page
    };
    const handleCartClick=()=>{
        navigate('/cart');
    }
    return(
        <>
        <div id="Head">
            <div id="logo">
                <img src="https://img.freepik.com/premium-vector/bakery-logo-design_260747-392.jpg" alt="" />
                <h1>Random Bakers</h1>
            </div>
       
           <div id="top">
                <div id="account">
                  <button id="btn" onClick={handleAccountClick}> 
                     <span class="icon"><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></span> 
                     <span class="text">Account</span> 
                  </button>
                </div>

                <div id="account">
                  <button id="bt" onClick={handleCartClick}> 
                     <span class="icon"><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon></span> 
                     <span class="text">Cart</span> 
                  </button>
                </div>
           </div>
        </div>
        <hr />
            <div id="main">
                <div id="Buttons">
                    <a href="/home">Home</a>
                    <a href="/items">Products</a>
                    <a href="/Orders">Orders</a> 
                    
                </div>
                <div id="del"> 
                <span class="icon"><LocalShippingOutlinedIcon></LocalShippingOutlinedIcon></span> 
                <span class="text" onClick={handleDeliveryClick}>Delivery Info</span>     
                </div>
            </div> 
            <hr />
        </>
    );
}

export default Nav;