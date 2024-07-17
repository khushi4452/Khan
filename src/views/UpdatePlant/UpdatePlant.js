import React, {useEffect, useState } from 'react'
import "./UpdatePlant.css"
import { useParams } from 'react-router-dom'
import toast , {Toaster} from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';



function UpdatePlant() {
  const { id } = useParams();

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("0")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const updatePlant = async() => {

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/plant/${id}`,{
      name:name,
      category:category,
      price:price,
      image:image,
      description:description
    })
 
    toast.success(response.data.message)


  }

const loadPlant=async(id)=>{

if(!id){
  return
}


  const response = await axios.get(`${process.env.REACT_APP_API_URL}/plant/${id}`)




  const {name,image,price,category,description}=response.data.data

  setName(name)
  setImage(image)
  setCategory(category)
  setPrice(price)
  setDescription(description)
}
 

  useEffect(()=>{
 
       loadPlant(id)
      
  },[id])

 




  return (
    <div>
     

      <form>
      <div className="form-heading">
      <h1>Update Plant</h1>
       </div>

      <div className="form-group">
      <label for="name">Name:</label>
        <input
          type='text'
          placeholder='Enter Plant Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='plant-input'
        />
        </div>

        <div className="form-group">
        <label for="category">Category:</label>
        <input
          type='text'
          placeholder='Enter Plant Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='plant-input'
        />
        </div>


         <div className="form-group">
         <label for="description">Price:</label>
        <input
          type='number'
          placeholder='Enter Plant Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='plant-input'
        />
         </div>

         <div className="form-group">
         <label for="image">Image Preview</label>
        <img src={image} className='img-preview' />
        </div>

        <div className="form-group">
        <label for="image">Image:</label>
        <input
          type='text'
          placeholder='Enter Plant Image URL'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='plant-input'
        />
        </div>
         <div className="form-group">
         <label for="description">Description:</label>
        <input
          type='text'
          placeholder='Enter Plant Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='plant-input'
        />
        </div>





        <button type="button" onClick={updatePlant}>Update Plant</button>
        <Link to="/" className='show-all-button'>Show All Plants</Link>
      </form>
      <br/>
      <br/>
      

      <Toaster/>
    </div>
  )
}

export default UpdatePlant