import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import { ethers } from 'ethers';
import contractmetadata from '../abi/abi.json'
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

type IProps = {
    provider: any
}

const SendedDetail = ({ provider }: IProps) => {
    const [projectBalance, setProjectBalance] = useState<string>("")
    // const [reamainBalance, setReamainBalance] = useState<string>("")
    const [request, setRequest] = useState<object[]>([]);

    let { projectaddress } = useParams();
    const address: string = String(projectaddress)
    const signer = provider.getSigner()
    const project = new ethers.Contract(
        address,
        contractmetadata.projectabi,
        signer
    );

    console.log(project)

    useEffect(() => {
        const getAllRequest = async () => {
            const seerequest = await project.getAllRequests();
            if (seerequest.length > 0) {
                setRequest(seerequest)
            }
            const probalance = await project.getBalance()
            setProjectBalance(probalance['_hex'])

            // const remainbala = await project.price()
            // setReamainBalance(remainbala['_hex'])
        }
        getAllRequest()
    }, [])

    const unlockRequestHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const index: number = Number((event.target as HTMLInputElement).value)
        const unlockreq = await project.unlockRequest(index)
        console.log('Unlock request', unlockreq)
    };

    return (
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
                            {/* <Card.Subtitle>
                                Balance : {reamainBalance}
                            </Card.Subtitle> */}
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
                            <div style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}> <h3>Project Submitted Requests.</h3></div>
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
                                            <td>{Object.values(item)[2] ? <Button variant='success' value={i} onClick={unlockRequestHandler}>Unlock</Button> : "false"}</td>
                                            <td>{Object.values(item)[3] ? "true" : "false"}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </Table>
                                : <p>No requests are yet.</p>}
                        </Col>

                    </Row>
                </Tab>

            </Tabs>
        </Container>
    )
}

export default SendedDetail
