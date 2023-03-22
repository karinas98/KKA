// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API_URL } from '../consts-data';
// import { useParams } from 'react-router-dom';
// //import { useLocation } from 'react-router-dom';

// const MyList = () => {
//   //const location = useLocation();
//   const [listedFoods, setListedFoods] = useState([]);
//   //const { listedFoodId } = useParams();
//   useEffect(() => {
//     const getList = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/foods/${foodId}`);
//         setListedFoods([...listedFoods, res.data.data]);
//         console.log(res);
//         console.log(listedFoods);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getList();
//   }, []);

//   return (
//     <div>
//       {listedFoods.map((food) => (
//         <ul key={food._id}>
//           <li>
//             <h1>{food.name}</h1>
//           </li>
//           <li>
//             <h2>{food.origin}</h2>
//           </li>
//           <li>
//             <img src={food.foodUrl} alt="food" />
//           </li>
//           <li>
//             <p>{food.description}</p>
//           </li>
//         </ul>
//       ))}
//     </div>
//   );
// };

// export default MyList;
