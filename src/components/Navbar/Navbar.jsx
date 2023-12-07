import React, { useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";
import logo from "../../Assets/Images/logo.png"
import "./Navbar.css";

import { data } from "../../Assets/Data/shirt_data";

function Navbar() {
  const { bag, wishlist, setPage, setClearAllFilters, setFilteredShirtData, setSearchedData } =
    useContext(StoreContext);
  
  const logedUser = JSON.parse(localStorage.getItem("loginDetails"));  
  function navHome() {
    setPage("home");
    setSearchedData("");
    setClearAllFilters(true);
  }
  function navWishlist() {
    setPage("wishlist");
    setClearAllFilters(true);
  }
  function navBag() {
    setPage("bag");
    setClearAllFilters(true);
  }
  function navAccount (){
    setPage("login");
  }

  const signOut = () => {
     localStorage.removeItem("logedUser");
     setPage("home");
   };
   

  function search() {
    setClearAllFilters(true);
    setPage("home");
    let search_txt = document.getElementById("search_txt").value;
    search_txt = search_txt.replace(/\s+/g,' ').trim();
    setSearchedData(search_txt);
    search_txt = search_txt.toLowerCase();
    document.getElementById("search_txt").value =search_txt;
    setFilteredShirtData(data.filter((e) => e[1].toLowerCase().includes(search_txt)));
  }

  return (
    <nav>
      <img src={logo} onClick={navHome} alt="img" className='brand-logo'/>
      <div className="nav-actions">
        <div className="search-bar">
          <div className="search-btn" onClick={search}>
            <span className="web_sprite search-icon"></span>
          </div>
          <input
            type="text"
            id="search_txt"
            placeholder={"Search for products and more"}
            onKeyPress={(e) => {
              if (e.key === "Enter") search();
            }}
          ></input>
        </div>
        <div className="nav-btn" onClick={navWishlist}>
          {wishlist.length > 0 && <span className="number-bubble">{wishlist.length}</span>}
          <span className="web_sprite wishlist-icon wish-btn"></span>
          <span className="wish-btn">Wishlist</span>
        </div>
        <div className="nav-btn" onClick={navBag}>
          {bag.length > 0 && <span className="number-bubble">{bag.length}</span>}
          <span className="web_sprite bag-icon bag-btn"></span>
          <span className="bag-btn">Bag</span>
        </div>
        <div className="nav-btn" onClick={navAccount}>
          <span className="fa fa-user fa-lg" aria-hidden="true"  onClick={logedUser ? () => signOut() : () => setPage("login")}></span>
          <span className="account-btn">{logedUser === null ? "Sign In" : "Sign Out"}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
