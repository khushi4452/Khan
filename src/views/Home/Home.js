import React, { useEffect, useState } from 'react';
import './Home.css';
import PlantCard from '../../components/PlantCard/PlantCard';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Imgadd from './add .png'; 
import { Link } from 'react-router-dom';

function Home() {
  const [plants, setPlants] = useState([]);

  const loadPlants = async () => { 
    try {
      toast.loading('Loading Plants...');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/plants`);
      toast.dismiss();
      toast.success('Plants Loaded Successfully');
      setPlants(response.data.data);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load plants');
      console.error('Error fetching plants:', error);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  return (
    <div>
      <div className="form-heading-cont">
        <div className="form-heading"> Nursery Plant Management</div>
        <Link className="button-add add-button" to={`/add`}>
          Add New Plant
        </Link>
      </div>

      {plants && plants.length > 0 ? (
        plants.map((plant, i) => {
          const { _id, name, category, price, image, description } = plant;
          return (
            <PlantCard
              key={i}
              _id={_id}
              name={name}
              category={category}
              price={price}
              image={image}
              description={description}
              loadPlants={loadPlants}
            />
          );
        })
      ) : (
        <p>No plants available.</p>
      )}
      <Toaster />
    </div>
  );
}

export default Home;
