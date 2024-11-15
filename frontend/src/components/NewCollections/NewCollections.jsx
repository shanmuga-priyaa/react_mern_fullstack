import React,{useState,useEffect} from 'react';
import './NewCollections.css';
//import new_collections from '../Assets/new_collections';
import Items from '../Item/Item';

const NewCollections = () => {
const [new_collections, setNewCollections] = useState([]);
useEffect(() => {
  fetch("http://localhost:4000/newcollections")
  .then((Response) => Response.json())
  .then((data) => setNewCollections(data));
},[])
  return (
    <div className='new-collection'>
      <h1>NEW COLLECTIONS FOR YOU</h1>
      <div className='collection'>
        {new_collections.map((item, i) => {
          return (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
export default NewCollections;
