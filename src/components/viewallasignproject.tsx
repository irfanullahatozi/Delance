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


const AllAsignProject = ({ walletaddress, contractaddress, provider }: IProps) => {

    const [projects, setProjects] = useState<string[]>([])

    useEffect(() => {
        const getallprojects = async () => {
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                contractaddress,
                contractmetadata.abi,
                signer
            );

            // console.log("Contract0",contract.getBalance())
            const getallproject = await contract.getFreelancerProjects(walletaddress)
            // const contract1 = new ethers.Contract(
            //     getallproject[0],
            //     contractmetadata.projectabi,
            //     signer
            // );
            // const deadline = await contract1.employer()
            // console.log("employer address", deadline)
            // console.log('freelancer', await contract1.freelancer())
            // console.log('Balance', await contract1.status())
            // const request = await contract1.createRequest("test1", 1)
            // console.log(request)
            // const payreq = await contract1.payRequest(0)
            // console.log(payreq)
            setProjects(getallproject)
        }
        getallprojects()
    }, [walletaddress])


    return (<>
        <div>
            <Row>
                <Col></Col>
                <Col>
                    <div style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}> <h3>All Assign Projects.</h3></div>
                    {projects.length > 0 ? <Table striped bordered hover>
                        <thead>
                            <tr key="head">
                                <th>#</th>
                                <th>Project Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item}</td>
                                    <td><Link to={`/assigndetail/${item}`}> <Button variant="primary" >Detail</Button> </Link></td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                        : <p>No project assign yet</p>}
                </Col>
                <Col></Col>
            </Row>
        </div>

    </>
    );
}

export default AllAsignProject;