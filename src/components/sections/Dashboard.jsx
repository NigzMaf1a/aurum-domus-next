import React, { useState, useEffect } from "react";
import UserInfo from "../../../../../aurumdomus/frontend/src/utils/userInfo";

function Dashboard({ userID }) {
  const [dataSets, setDataSets] = useState([]); // array of data objects from shuffleData
  const [currentIndexes, setCurrentIndexes] = useState([0, 0, 0, 0]); // track which data shown in each div

  useEffect(() => {
    const userInfo = new UserInfo(userID);

    function fetchAndSetData() {
      const data = userInfo.shuffleData(); // object of objects or array of objects? Let's normalize
      // Normalize data to an array of objects for easier cycling
      const dataArray = Array.isArray(data)
        ? data
        : Object.values(data);
      setDataSets(dataArray);
    }

    fetchAndSetData();

    // Refresh data every 2 minutes (120,000 ms)
    const refreshInterval = setInterval(() => {
      fetchAndSetData();
    }, 120000);

    return () => clearInterval(refreshInterval);
  }, [userID]);

  useEffect(() => {
    if (dataSets.length === 0) return;

    // Every 20 seconds, update which data index to show in each div
    const interval = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((idx) => (idx + 1) % dataSets.length)
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [dataSets]);

  // Helper to render <p> tags for each property of an object
  const renderProperties = (obj) =>
    Object.entries(obj).map(([key, val]) => (
      <p key={key}>
        <strong>{key}:</strong> {String(val)}
      </p>
    ));

  return (
    <div className="container my-4">
      <div className="row">
        {[0, 1, 2, 3].map((divIdx) => (
          <div
            key={divIdx}
            id={["one", "two", "three", "four"][divIdx]}
            className="col-12 col-md-6 col-lg-3 mb-4 border rounded p-3"
          >
            {dataSets.length > 0 ? (
              renderProperties(dataSets[currentIndexes[divIdx]] || {})
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
