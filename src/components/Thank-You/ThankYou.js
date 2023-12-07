import React, { useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";

import './ThankYou.css'

function ThankYou() {
    const { setPage } = useContext(StoreContext);
  return (
    <div className="thankyou-page">
       <div className="thankyou-heading">Thank You for the SHOPPING!!!</div> 
      <img src='https://img.freepik.com/free-vector/purchasing-hab…behavior-abstract-metaphor_335657-2881.jpg?w=2000' alt="img" className="tnakyou-image"/>
      <button
              className="thankyou-btn"
              onClick={() => {
                setPage("home");
              }}
            >
              CONTINUE SHOPPING
            </button>
    </div>
  );
}

export default ThankYou;