import styled from "styled-components";

const StyledDiv = styled.div`
  .columnName {
    font-weight: bold;
  }
  .columnLabel {
    background-color: ${props=> props.theme.coffee};
    color: ${props => props.theme.offWhite};
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

export default StyledDiv;