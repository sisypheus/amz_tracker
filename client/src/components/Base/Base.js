import React from 'react'
import { Container } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';


const Base = (props) => {
    return (
        <Container maxWidth={false} style={{padding: '0', height: '100%'}}>
            <Navbar />

            <div id="background">
                {React.createElement(props.component, props)}
            </div>
        </Container>
    )
}

export default Base;
