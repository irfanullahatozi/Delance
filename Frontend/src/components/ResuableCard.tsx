import React from 'react'
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
type IProps = {
  walletaddress: string, balance: number
}
const ResuableCard = ({ walletaddress, balance }: IProps) => {
  return (
    <Row>
      <Col></Col>
      <Col>
        <Card style={{ width: '100%', marginTop:"10%", marginBottom:"10%" }}>
          <Card.Body>
            <Card.Title>Connected Wallet Information</Card.Title>
            <Card.Subtitle>
              Wallet Address: {walletaddress}
            </Card.Subtitle>
            <Card.Subtitle>
              Balance: {balance}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>

  )
}

export default ResuableCard
