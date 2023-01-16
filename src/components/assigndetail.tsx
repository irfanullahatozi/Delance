import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import { ethers } from 'ethers';
import contractmetadata from '../abi/abi.json'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
type IProps = {
   provider: any
}

const Detail = ({ provider }: IProps) => {
  const [request, setRequest] = useState<object[]>([]);
  const [projectBalance, setProjectBalance] = useState<string>("")
  const [requestTitle, setRequestTitle] = useState<string>("")
  const [amount, setAmount] = useState<number>(0);

  let { projectaddress } = useParams();
  const address: string = String(projectaddress)
  const signer = provider.getSigner()
  const project = new ethers.Contract(
    address,
    contractmetadata.projectabi,
    signer
  );

  useEffect(() => {
    const getAllRequest = async () => {
      const seerequest = await project.getAllRequests();
      if (seerequest.length > 0) {
        setRequest(seerequest)
      }
      const probalance = await project.getBalance()
      setProjectBalance(probalance['_hex'])
    }
    getAllRequest()
  }, [])


  const handleProjectRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newrequest = await project.createRequest(requestTitle, amount)
    console.log('newrequest is created', newrequest)
  };

  const releaseAmountHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const index:number = Number((event.target as HTMLInputElement).value)
    const payreq = await project.payRequest(index)
    console.log('Payment is realsead', payreq)
  };


  const requestInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredadd = event.target.value;
    setRequestTitle(enteredadd);
  };


  const amountInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredamount = event.target.value;
    setAmount(Number(enteredamount));
  };

  return (<>

    <Container>

      <Row>
        <Col></Col>
        <Col>
          <Card style={{ width: '100%', marginBottom: "10%" }}>
            <Card.Body>
              <Card.Title>Project Amount</Card.Title>
              <Card.Subtitle>
                Balance : {projectBalance}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>

      <Tabs
        defaultActiveKey="request"
        id="assignprojectsdetail"
        className="mb-3"
        justify
      >
        <Tab eventKey="request" title="Requests">
          <Row>

            <Col>
              <div style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}> <h3>Project Requests.</h3></div>
              {request.length > 0 ? <Table striped bordered hover>
                <thead>
                  <tr key="head">
                    <th>#</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Locked</th>
                    <th>Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {request.map((item, i) => {
                    return <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{Object.values(item)[0]}</td>
                      <td>{Object.values(item)[1]['_hex']}</td>
                      <td>{Object.values(item)[2] ? "true" : "false"}</td>
                      <td>{Object.values(item)[3] ? "true" : <Button variant='success' value={i} onClick={releaseAmountHandle}>Widthawarl</Button>}</td>
                    </tr>
                  })}

                </tbody>
              </Table>
                : <p>No requests are yet.</p>}
            </Col>

          </Row>
        </Tab>
        <Tab eventKey="profile" title="Create Request">
          <div>
            <Row>
              <Col></Col>
              <Col>
                <Form onSubmit={handleProjectRequest}>
                  <Form.Group className="mb-3" controlId="freelanceraddress">
                    <Form.Label>Request Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter request title" onChange={requestInputHandler} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="projectamount">
                    <Form.Label>Request Amount</Form.Label>
                    <Form.Control type="text" name="amount" placeholder="Amount of the request" onChange={amountInputHandler} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form></Col>
              <Col></Col>
            </Row>
          </div>
        </Tab>
      </Tabs>
    </Container>
  </>
  )
}

export default Detail
