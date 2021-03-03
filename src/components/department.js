import React,{useState,useEffect} from 'react';
import {useParams,NavLink} from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'
import ComplexGrid from './productList'
import axios from "axios"



const useStyle = makeStyles((theme) => (
    {
        navcontent: {
            color: "black",
            textDecoration: 'none',
            padding: '10px 15px',
            margin: '2px 10px'
        },
        Active: {
            borderBottom: '2px solid #DD364F'
        }
    }

))

export default function DepartmentWiseProducts(){
    const classes = useStyle()
    const {department} = useParams();
    console.log(department)
    const [tileData, setTileData] = useState(null);
    useEffect(()=>{
        axios
        .get(
          `http://localhost:8000/ecommerce/products/?department=${department}`
        )
        .then((response) => {
                    console.log(response.data)
                    setTileData(response.data)
            
        })
        .catch((err) => {
                    console.log(err)
      
        });
      },[department]//make it comonent should mount for rerendering by removing {}
      );
    return (
        <div>
              <Box display='flex' alignItems="center" p={2} mt={2} mb={5}>
                <NavLink activeClassName={classes.Active} className={classes.navcontent} to={`/departments/electronics`}>Electronics</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.navcontent} to={`/departments/science`}>Science</NavLink>
                <NavLink activeClassName={classes.Active} className={classes.navcontent} to={`/departments/entertainment`}>Entertainment</NavLink>
            </Box> 
             
          
      {tileData?.map((tile) => (  
       <ComplexGrid tile={tile} key={tile.id} />
      ))}
        </div>
    );
}


