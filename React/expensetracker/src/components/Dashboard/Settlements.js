import React, { useState, useEffect } from "react";
import "./Settlements.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "@mui/x-charts";

const Settlements = () => {
  const [data, setData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const fetchExpenseData = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("No user ID found in session storage");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/expense/user/${userId}/monthly-expenses`
      );
      const result = await response.json();
      console.log(result);

      const xAxisData = Object.keys(result);
      const data = Object.values(result);

      setData(data);
      setXAxisData(xAxisData);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  console.log(data);
  return (
    <>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: xAxisData,
          },
        ]}
        series={[{ data }]}
        width={500}
        height={300}
      />
    </>
  );
};

export default Settlements;
