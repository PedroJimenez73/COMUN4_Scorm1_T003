import React from 'react';
import RotaryCard from './RotaryCard';
import styled from 'styled-components'

const CardsContainer = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
`

const RotaryCardContainer = (props) => (
        <CardsContainer 
        style={props.position ? {gridArea: props.position}: null}>
            {(props.cards || []).map((c, index) => <RotaryCard key={index+1} title={c.title} img={c.img} text={c.text} elements={c.elements}/>)}            
        </CardsContainer>
    );

export default RotaryCardContainer;