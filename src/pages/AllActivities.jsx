import { useState, useEffect } from 'react';
import activitiesService from '../services/activities.service';
import CardActivity from '../components/CardActivity';

function AllActivities() {
  const [activities, setActivities] = useState([]);

  const getAllActivities = () => {
    activitiesService
      .getAllActivities()
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div>
      {activities.length === 0 ? (
        <div>Loading...</div>
      ) : (
        activities.map((activity) => (
          <CardActivity name={activity.name} key={activity._id} />
        ))
      )}
    </div>
  );
}

export default AllActivities;
