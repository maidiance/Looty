import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Loot from "./Loot";

const StyledDiv = styled.div`
  .columnName {
    font-weight: bold;
  }
  .columnLabel {
    background-color: ${props=> props.theme.coffee};
    color: #f8f4f2;
    border-bottom: 1px solid black;
  }
  table {
    width: 95%;
    margin: 0 auto;
  }
  tr {
    text-align: left;
    background-color: ${props=> props.theme.offWhite};
  }
  tr:nth-child(even) {
    background-color: ${props=> props.theme.latte};
  }
  tr:hover:not(.columnLabel) {
    background-color: ${props=> props.theme.toast};
  }
  td {
    padding-left: 5px;
    text-align: left;
  }
`;

const LootDisplay = () => {
  const [loot, setLoot] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/loot")
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
