import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleTrain() {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch a single train from your backend API based on trainId
    fetch(`/api/train-schedule/${trainId}`)
      .then(response => response.json())
      .then(data => setTrain(data))
      .catch(error => console.error('Error fetching train data:', error));
  }, [trainId]);

  if (!train) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{train.name}</h1>
      <p>Departure Time: {train.departureTime}</p>
      <p>Delay: {train.delay} minutes</p>
      <p>Price: ${train.price}</p>
      <p>Seat Availability (Sleeper): {train.seatAvailability.sleeper}</p>
      <p>Seat Availability (AC): {train.seatAvailability.ac}</p>
    </div>
  );
}

export default SingleTrain;
