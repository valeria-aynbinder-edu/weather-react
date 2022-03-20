import React from 'react';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';

export class Subscriptions extends React.Component {


    render() {
        return(
            <>
                <Header />
                <Container>
                    <h1>Subscriptions content</h1>
                </Container>
            </>
        )
    }
}