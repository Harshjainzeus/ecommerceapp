import React, { useEffect, useState } from "react";
import axios from "axios";
import {useStore} from '../context/store';
import ComplexGrid from "./productList";

export default function Searchcomp(){
    const store = useStore();
    let searchterm = store.searchTerm;
    const [data,setData] = useState(null);
    useEffect(()=>{
        axios
        .get(
          `http://localhost:8000/ecommerce/products`
        )
        .then((response) => {
                    console.log(response.data)
                    setData(response.data)
            
        })
        .catch((err) => {
                    console.log(err)
      
        });
      },[]//make it comonent should mount for rerendering by removing {}
      );
    return (<div>
        Search Component
        {
            data?.filter((val)=>{
                if(val==="" ){return val;}
                else if(val.title.toLowerCase().includes(searchterm.toLowerCase())){
                    return val;
                }
                
            }).map((val,key)=>{
                return(
                    <div key={val.id}>
                        <ComplexGrid tile={val}/>
                    </div>
                )
            })
        }
    </div>);
}