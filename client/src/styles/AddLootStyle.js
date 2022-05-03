import styled from 'styled-components';
const StyledDiv = styled.div`
    background-color: ${props=> props.theme.coffee};
    h1, h2 {
        color: ${props => props.theme.toast};
        text-align: center;
    }
    .addLootInfo {
        text-align: center;
        padding: 2%;
        color: ${props=> props.theme.offWhite};
    }
    p {
        color: ${props=> props.theme.offWhite};
        padding: 5px;
        display: inline;
    }
    .errors {
        text-align: center;
        margin-bottom: 1%;
    }
    form {
        margin: 0 auto;
        width: 80%;
        padding: 2px 0;
    }
    .reverse {
        display: inline-block;
        -webkit-transform: matrix(-1, 0, 0, 1, 0, 0);
        -moz-transform: matrix(-1, 0, 0, 1, 0, 0);
        -o-transform: matrix(-1, 0, 0, 1, 0, 0);
        transform: matrix(-1, 0, 0, 1, 0, 0);
    }
    input {
        background-color: ${props=> props.theme.toast};
        color: black;
        padding: 5px 0;
        display: inline;
    }
    button {
        border-radius: 15px;
        width: 50%;
        margin: 1% 0;
        padding: 2%;
        background-color: ${props => props.theme.latte};
    }
    .hidden {
        display: none;
    }
`

export default StyledDiv;