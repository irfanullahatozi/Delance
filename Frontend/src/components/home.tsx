import React from 'react'
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col'
const Home = () => {
    return (
        <Row>
            <Col></Col>
            <Col>
                <Card style={{ width: '100%', marginTop: "10%", marginBottom: "10%" }}>
                    <Card.Body>
                        <Card.Title>Welcom to Home</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default Home
