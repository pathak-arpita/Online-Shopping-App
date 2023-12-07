import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Navbar, Home, Wishlist, Bag, Product, Footer, ThankYou } from "./components";

import { StoreContext } from "./Contexts/StoreContext";

import { data } from "./Assets/Data/shirt_data";
import Login from "./components/Login-SignUp/Login";
import SignUp from "./components/Login-SignUp/SignUp";

function App() {
  const [searchedData, setSearchedData] = useState("");
  const [shirtData, setShirtData] = useState(data);
  const [genderName, setGenderName] = useState("Everyone");
  const [filteredShirtData, setFilteredShirtData] = useState(data);
  const [filterPrices, setFilterPrices] = useState([]);
  const [selectedFilterPrices, setSelectedFilterPrices] = useState([]);
  const [sortBox, setSortBox] = useState();
  const [clearAllFilters, setClearAllFilters] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [bag, setBag] = useState([]);
  const [page, setPage] = useState("home");
  const [product, setProduct] = useState([]);

  function sortLtoH(filter_data) {
    let sortedList = filter_data;
    sortedList.sort((a, b) => a[3] - b[3]);
    setShirtData(sortedList);
  }
  function sortHtoL(filter_data) {
    let sortedList = filter_data;
    sortedList.sort((a, b) => b[3] - a[3]);
    setShirtData(sortedList);
  }

  //filter box 
  //it is used to store filtered datas in Shirt data states which is used by resulbox component.
  useEffect(() => {
    let prices = [];
    let shirts = [...filteredShirtData];
    
    //creating price bands
    filteredShirtData.forEach((data) => {
      if (data[3] <= 600) prices.push(600);
      else if (data[3] <= 750) prices.push(750);
      else if (data[3] <= 1500) prices.push(1500);
      else if (data[3] <= 7000) prices.push(7000);
    });
    setFilterPrices([...new Set(prices)].sort((a, b) => a - b));
    
    //this part of the code is use to control clear filter. and set shirt . and return a value to reset clear fiilter button.
    if (selectedFilterPrices.length > 0) {
      shirts = shirts.filter((data) => {
        for (let i = 0; i < selectedFilterPrices.length; i++) {
          if (selectedFilterPrices[i] === 600 && data[3] >= 300 && data[3] <= 600) return true;
          else if (selectedFilterPrices[i] === 750 && data[3] >= 601 && data[3] <= 750) return true;
          else if (selectedFilterPrices[i] === 1500 && data[3] >= 751 && data[3] <= 1500) return true;
          else if (selectedFilterPrices[i] === 7000 && data[3] >= 1501 && data[3] <= 7000) return true;
        }
        return false;
      });
    }
    if (sortBox === "Price: Low to High") sortLtoH(shirts);
    else if (sortBox === "Price: High to Low") sortHtoL(shirts);
    //finally shirt data set
    else setShirtData(shirts);
    if (
      selectedFilterPrices.length === 0 &&
      genderName === "Everyone" &&
      sortBox === "Recommended"
    )
      setClearAllFilters(true);
    //  console.log("app.js useeffectrenders");
  }, [filteredShirtData, selectedFilterPrices, genderName, sortBox]);

  // filterbox

  
  //clear filter
  useEffect(() => {
    if (clearAllFilters === true) {
      document.querySelectorAll(".sortByDropDown li").forEach((li) => (li.style.fontWeight = "100"));
      document.querySelectorAll("input[type=radio]:checked").forEach((btn) => (btn.checked = false));
      document.querySelectorAll("input[type=checkbox]:checked").forEach((btn) => (btn.checked = false));
      setShirtData([...data]);
      if (searchedData === "") setFilteredShirtData([...data]);
      else setFilteredShirtData(data.filter((e) => e[1].toLowerCase().includes(searchedData)));
      setSortBox("Recommended");
      setGenderName("Everyone");
      setSelectedFilterPrices([]);
     // console.log("clearfilter renderd");
    }
  }, [clearAllFilters, searchedData]);
//clear filter


  return (
    <div className="App">
      <StoreContext.Provider
        value={{
         
          bag,
          page,
          product,
          sortBox,
          wishlist,
          shirtData,
          genderName,
          searchedData,
          filterPrices,
          clearAllFilters,
          filteredShirtData,
          selectedFilterPrices,
          setSelectedFilterPrices,
          setFilteredShirtData,
          setClearAllFilters,
          setFilterPrices,
          setSearchedData,
          setGenderName,
          setShirtData,
          setWishlist,
          setSortBox,
          setProduct,
          setPage,
          setBag,
        }}
      > 
        <Navbar />
        <div className="container">
          {page === "home" && <Home />}
          {page === "wishlist" && <Wishlist />}
          {page === "bag" && <Bag />}
          {page === "product" && <Product />}
          {page === "thankyou" && <ThankYou />}
          {page === "login" && <Login />}
          {page === "signup" && <SignUp />}
        </div>
        <Footer />
        <ToastContainer theme="dark" autoClose={2000} />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
