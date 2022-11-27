import styled from 'styled-components';
const StyledDiv = styled.div`
    background-color: ${props=> props.theme.coffee};
    h1, h2, h3 {
        color: ${props => props.theme.toast};
        text-align: center;
        margin-bottom: 1%;
    }
    h2 {
        font-size: 1.4rem;
    }
    p {
        color: ${props => props.theme.latte};
    }
    form {
        text-align: center;
        margin: 0 auto;
        width: 80%;
        padding: 2px 0;
        color: ${props => props.theme.toast};
    }
    input {
        background-color: ${props=> props.theme.toast};
        color: black;
        padding: 5px 0;
        margin-left: 1%;
    }
    .errors {
        text-align: center;
        margin-bottom: 1%;
    }
    .register {
        margin: auto;
    }
    #textInput {
        width: 70%;
    }
    #checkboxes {
        width: 30%;
    }
    button {
        display: block;
        border-radius: 5px;
        width: 30%;
        margin: 2% auto;
        padding: 2%;
        background-color: ${props => props.theme.latte};
    }
`

export default StyledDiv;