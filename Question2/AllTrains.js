import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch all trains from your backend API
    fetch("/api/train-schedule")
      .then((response) => response.json())
      .then((data) => setTrains(data))
      .catch((error) => console.error("Error fetching train data:", error));
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            <Link to={`/train/${train.id}`}>{train.name}</Link>
            <p>Departure Time: {train.departureTime}</p>
            <p>Delay: {train.delay} minutes</p>
            <p>Price: ${train.price}</p>
            <p>Seat Availability (Sleeper): {train.seatAvailability.sleeper}</p>
            <p>Seat Availability (AC): {train.seatAvailability.ac}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTrains;
