import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import contractmetadata from '../abi/abi.json'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
type IProps = {
    walletaddress: string, contractaddress: string, provider: any
}


const AllProjects = ({ walletaddress, contractaddress, provider }: IProps) => {

    const [projects, setProjects] = useState<string[]>([])

    useEffect(() => {
        const getallprojects = async () => {
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                contractaddress,
                contractmetadata.abi,
                signer
            );

            const getallproject = await contract.getEmployerProjects(walletaddress)
            setProjects(getallproject)
        }
        getallprojects()
    }, [walletaddress])


    return (<>
        <div>
            <Row>
                <Col></Col>
                <Col>
                    <div style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}> <h3>Send Project to Freelancer.</h3></div>
                    {projects.length > 0 ? <Table striped bordered hover>
                        <thead>
                            <tr key="head">
                                <th>#</th>
                                <th>Freelancer Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item}</td>
                                    <td><Link to={`/sendprojectdetail/${item}`}> <Button variant="primary" >Detail</Button> </Link></td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                        : <p>No project Sended yet</p>}
                </Col>
                <Col></Col>
            </Row>
        </div>

    </>
    );
}

export default AllProjects;