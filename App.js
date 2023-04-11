import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[products,setProducts]=useState([]);
  const[page,setPage]=useState(1);
  const fetchProducts=async ()=>{
    const res=await fetch("https://dummyjson.com/products");
    const data=await res.json();
    // console.log(data);
    if(data&&data.products)
    setProducts(data.products)

  }
  console.log(products[0]);
  useEffect(()=>{
    fetchProducts()
  },[])
  const selectpages=(index)=>{
    setPage(index);
    console.log({index})

  }
  // const displayhello=()=>{
  //   return (<Displaydetails/>)
  // }
  return (
    <div className="App">
      {products.length>0&& <div className='products'>
        {products.slice(page*10-10,page*10).map((value)=>{
          return <span className='single_products'>
          <img src={value.images[0]} alt={value.brand} />
          <span>{value.title}</span>
          </span>
        })}
        </div>}
      {
        products.length>0&&<div className='display_page'>
          {page>1&&<span onClick={()=>selectpages(page-1)}>◀️ previous</span>}
          {
            [...Array(products.length/10)].map((value,index)=>{
              return <span onClick={()=>selectpages(index+1)}>{index+1}</span>
            })
          }
          
          {page<products.length/10&&<span onClick={()=>selectpages(page+1)}>▶️Next</span>}
        </div>
      }
    </div>
  );
}

export default App;
