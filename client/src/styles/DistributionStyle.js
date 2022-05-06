import styled from 'styled-components';
const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    .hide {
        display: none;
    }
    .need {
        width: 30%;
        background-color: ${props => props.theme.latte};
    }
    .greed {
        width: 30%;
        background-color: ${props => props.theme.coffee};
    }
    .undistributed {
        width: 30%;
    }
    .lootItem {
        background-color: ${props => props.theme.toast};
    }
    .drag-over {
        border: dashed 2px ${props => props.theme.offWhite};
    }
    h2 {
        color: ${props => props.theme.toast};
        text-align: center;
        margin-bottom: 1%;
    }
    p {
        color: ${props => props.theme.latte};
    }
`

export default StyledDiv;