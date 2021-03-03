// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';


import React,{useState,useEffect} from 'react';
import axios from "axios";
import ComplexGrid from './productList';


// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       justifyContent: 'space-around',
//       overflow: 'hidden',
//       backgroundColor: theme.palette.background.paper,
//     },
//     gridList: {
//       width: 500,
//       height: 450,
//     },
//     icon: {
//       color: 'rgba(255, 255, 255, 0.54)',
//     },
//   }));


//   export default function TitlebarGridList() {

//     const classes = useStyles();

//    
//     return (



//     //  <div className={classes.root}>
//     //     <GridList cellHeight={180} className={classes.gridList}>
//     //       <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
//     //         <ListSubheader component="div">December</ListSubheader>
//     //       </GridListTile>
//     //       {tileData?.map((tile) => (
//     //         <GridListTile key={tile.id}>
//     //           <img src={tile.image_url} alt={tile.title} />
//     //           <GridListTileBar
//     //             title={tile.title}
//     //             subtitle={<span>by: {tile.seller}</span>}
//     //             actionIcon={
//     //               <IconButton className={classes.icon}>
//     //                 {tile.cost}
//     //               </IconButton>
//     //             } 
//     //           />
//     //         </GridListTile>
//     //       ))}
//     //     </GridList>
//     //   </div>
//     );
//   }

// function Dashboard() {

    


//     return (

//         <div>
//             list will be here
//         </div>
        
//     );
// }

// export default Dashboard;


export default function Dashboard() {
  const [tileData, setTileData] = useState(null);
  useEffect(()=>{
    axios
    .get(
      "http://localhost:8000/ecommerce/products/?is_featured"
    )
    .then((response) => {
                console.log(response.data)
                setTileData(response.data)
        
    })
    .catch((err) => {
                console.log(err)
  
    });
  },[]
  );

  return (
   <div>
      {tileData?.map((tile) => (  
       <ComplexGrid tile={tile} key={tile.id} />
      ))}
  </div>
  );
}
