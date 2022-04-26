import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledDiv from '../styles/LootDisplayStyle';

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
      <table>
        <tbody>
          <tr className="columnLabel">
            <td>
              <p className="columnName">Item</p>
            </td>
            <td>
              <p className="columnName">Value</p>
            </td>
            <td>
              <p className="columnName">Bagged</p>
            </td>
            <td>
              <p className="columnName">Claimed</p>
            </td>
          </tr>
          {
            loot.map((item) => {
                return <Loot item={item} />;
          })}
        </tbody>
      </table>
    </StyledDiv>
  );
};

export default LootDisplay;
