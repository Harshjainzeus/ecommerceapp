import React, { useState, createContext, useContext } from "react";


const StoreContext = createContext({});
const StoreProvider = ({ children }) => {
  // const [products, setProducts] = useState([]);
  const [itemlist, setItemlist] = useState([]);
  const [sumtotal, setSumtotal] = useState(0);
  const [darkmode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

 
  const handleinputchange = (val) =>{
    setSearchTerm(val);
  }

  const addToCart = (data, qty) => {
    let temp = { product: data, qtyadd: qty };
    setItemlist([...itemlist, temp]);
    let total = data.cost * qty;
    setSumtotal(sumtotal + total);
    console.log(itemlist,sumtotal)
  };

  const toggletheme = () => {
    setDarkMode(!darkmode);
  }

  
  const removeCart = () => {
    setItemlist([]);
    setSumtotal(0);
  };

  const getTotal = async () =>{
    return sumtotal;
  }


  const storeStates = { addToCart, itemlist, sumtotal, darkmode, handleinputchange, removeCart , getTotal ,toggletheme,searchTerm};
  return (

    
    <StoreContext.Provider value={storeStates}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { useStore, StoreProvider, StoreContext };