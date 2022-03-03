import React from 'react';
import styled from 'styled-components';
import SeeText from './SeeText';

const SeeTextHorizontalDivContainer = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    @media only screen and (orientation: portrait){
        grid-template-columns: unset!important;
    }
    grid-column-gap: 10px;
    width: 100%;
`;
const SeeTextHorizontalContainer = (props) => {

    return(
        <SeeTextHorizontalDivContainer
        style={props.position ? {gridArea: props.position}: null}>
            {props.children.map(c => <SeeText title={c.title} text={c.text}></SeeText>)}
        </SeeTextHorizontalDivContainer>
        )
}


export default SeeTextHorizontalContainer;