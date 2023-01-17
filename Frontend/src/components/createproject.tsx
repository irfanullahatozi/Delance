import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getEpochTime } from '../utils/helpers';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import contractmetadata from '../abi/abi.json'
type IProps = {
    walletaddress: string, contractaddress: string
}

const CreateProject = ({ walletaddress, contractaddress }: IProps) => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner();
    // const contractAddress: string = "0x973b4cd7b035c3ad405df918ae399a1f2960e912"

    const [freelancerAddress, setFreelancerAddress] = useState<string>("");
    const [deadline, setDeadline] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);


    const handleDeployContract = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const contract = new ethers.Contract(
            contractaddress,
            contractmetadata.abi,
            signer
        );

        console.log(contract)
        const createdProject = await contract.createProject(freelancerAddress, deadline, { value: amount })
        console.log(createdProject)
        const getallproject = await contract.getEmployerProjects(walletaddress)
        console.log(getallproject)
    };

    const freelancerInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredadd = event.target.value;
        setFreelancerAddress(enteredadd);
    };

    const deadlineInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const entereddate = event.target.value;
        const epochdate = getEpochTime(entereddate);
        setDeadline(epochdate);
    };

    const amountInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredamount = event.target.value;
        setAmount(Number(enteredamount));
    };


    return (<>
        {/* <Header/> */}
        <div>
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={handleDeployContract}>
                        <Form.Group className="mb-3" controlId="freelanceraddress">
                            <Form.Label>Freelancer address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Freelanver wallet address" onChange={freelancerInputHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="projectdeadline">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" name="deadline" placeholder="Deadline of the Project" onChange={deadlineInputHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="projectamount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" name="amount" placeholder="Amount of the Project" onChange={amountInputHandler} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form></Col>
                <Col></Col>
            </Row>
        </div>

    </>
    );
}

export default CreateProject;