import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    img {
        max-width: 100%;
        height: auto;
        margin: 0 auto;
    }
    h1 {
        color: ${props => props.theme.brown};
    }
`

export default function Header(){
    return(
        <StyledHeader>
            <h1>Loot tracker and distributor</h1>
        </StyledHeader>
    )
}