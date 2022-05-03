import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledDiv from '../styles/DistributionStyle';
import Loot from "./Loot";

const LootDisplay = () => {
  const [loot, setLoot] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/loot?undistributed=true")
      .then((resp) => {
        setLoot(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <StyledDiv>
      
    </StyledDiv>
  );
};

export default LootDisplay;
