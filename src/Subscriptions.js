import axios from 'axios';
import React from 'react';
import { Button, Form, ListGroup, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';
import { getHeader, SUBSCRIPTIONS_IMPORT_URL, SUBSCRIPTIONS_URL } from './request_utils';

export class Subscriptions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subscriptions: [],
            showModal: false,
            country: "",
            city: "",
            showImportModal: false,
            file: null,
        }

        this.deleteSub = this.deleteSub.bind(this)
        this.handleFileImport = this.handleFileImport.bind(this)
    }

    get_subscriptions() {
        console.log('called get_subscriptions')
        axios.get(SUBSCRIPTIONS_URL, getHeader())
        .then(response => {
            console.log(response)
            this.setState({subscriptions: response.data})
        })
    }

    componentDidMount() {
        this.get_subscriptions()
    }

    handleAddNew() {
        console.log('called handleAddNew')
        this.setState({showModal: true})
    }

    handleSaveNew() {
        console.log('called handleSaveNew')
        axios.post(
            SUBSCRIPTIONS_URL, 
            {country: this.state.country, city: this.state.city}, 
            getHeader()
        )
        .then(response => {
            if (response.status == 201) {
                this.get_subscriptions()
            }
        })
        this.setState({showModal: false})
    }

    deleteSub(subId) {
        axios.delete(
            `${SUBSCRIPTIONS_URL}/${subId}`, 
            getHeader()
        ).then(response => {
            if (response.status == 200) {
                this.get_subscriptions()
            }
        })
    }

    handleFileImport() {
        console.log('called handleFileImport')
        const formData = new FormData();

        // Update the formData object
        formData.append(
          "file",
          this.state.file,
          this.state.file.name
        );
        axios.post(
            SUBSCRIPTIONS_IMPORT_URL, 
            formData,
            getHeader()
        ).then(response => {
            if (response.status == 200) {
                this.get_subscriptions()
            }
        })
    }

    render() {

        const subscriptions = this.state.subscriptions.map(
            sub => { return(
                <ListGroup.Item key={sub.id}>
                    {sub.country}, {sub.city} 
                    <Button onClick={() => this.deleteSub(sub.id)}>Delete</Button>
                </ListGroup.Item>
            )}
        )
        return(
            <>
                <Header />
                <Container>
                    <h1 className="m-3">Subscriptions 
                        <span>
                            <Button className="m-3" onClick={this.handleAddNew.bind(this)}>
                                Add new
                            </Button>
                            <Button onClick={() => this.setState({showImportModal: true})}>
                                Import from file
                            </Button>
                        </span>
                    </h1>

                    <ListGroup>
                        {subscriptions}
                    </ListGroup>
                </Container>

                <Modal show={this.state.showModal} 
                    onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new subscription</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter country" 
                                        value={this.state.country}
                                        onChange={(event) => this.setState({country: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>
                    
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="text" placeholder="Enter city" 
                                        value={this.state.city}
                                        onChange={(event) => this.setState({city: event.target.value})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSaveNew.bind(this)}>Save</Button>
                    </ModalFooter>
                </Modal>

                <Modal show={this.state.showImportModal} onHide={() => this.setState({showImportModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Import subscriptions</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>File</Form.Label>
                                <Form.Text>
                                    <Form.Control 
                                        type="file" 
                                        accept='.txt'
                                        onChange={(event) => this.setState({file: event.target.files[0]})}/>
                                </Form.Text>
                            </Form.Group>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleFileImport}>Save</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}