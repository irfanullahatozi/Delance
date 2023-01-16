// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Delance {
    address payable public freelancer; //wallet address of the freelancer
    address payable public employer; //address of the employer
    uint256 public deadline; //project completion date
    bool locked = false;
    uint256 public price; //amount in the contract
    Request[] public requests; //requests from freelancer

    struct Request {
        string title;
        uint256 amount;
        bool locked;
        bool paid;
    }

    //events
    event RequestUnlock(bool locked);
    event RequestCreated(string title, uint256 amount, bool locked, bool paid);
    event RequestPaid(address receiver, uint256 amount);

    //modifiers
    // this modifier is used when ever the function is restricted to freelancer
    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only Freelancer!");
        _;
    }

    // this modifier is used when ever the function is restricted to employer
    modifier onlyEmployer() {
        require(msg.sender == employer, "Only Employer!");
        _;
    }

    //constructor is called when we deploy the contract provide the freelancer, project deadline
    //the employer address is taken from the special variable and price value is also getting from the variable
    constructor(address payable _freelancer, uint256 _deadline) payable {
        employer = payable(msg.sender);
        freelancer = _freelancer;
        deadline = _deadline;
        if (msg.value > 0) {
            price = msg.value;
        }
    }

    //recive amount of the contract from everyone
    receive() external payable {
        if (msg.value > 0) {
            price += msg.value;
        }
    }

    //create request from freelancer
    function createRequest(
        string memory _title,
        uint256 _amount
    ) public onlyFreelancer {
        Request memory request = Request({
            title: _title,
            amount: _amount,
            locked: true,
            paid: false
        });
        requests.push(request);
        emit RequestCreated(
            request.title,
            request.amount,
            request.locked,
            request.paid
        );
    }

    //get all the requests from the freelancer
    function getAllRequest() public view returns (Request[] memory) {
        return requests;
    }

    // unlock the freelancer request by employer
    function unlockRequest(uint256 _index) public onlyEmployer {
        Request storage req = requests[_index];
        require(req.locked, "Already unlocked");
        req.locked = false;
        emit RequestUnlock(req.locked);
    }

    //get the specific request from requests array
    function getRequest(uint256 _index) public view returns(Request memory){
        return requests[_index];
    }

    //freelancer widthrawal request
    function payRequest(uint256 _index) public onlyFreelancer {
        require(!locked, "Reentrant detected!");
        Request storage request = requests[_index];
        require(!request.locked, "Request is locked");
        require(!request.paid, "Already paid");
        require(price > request.amount, "Dont Balace");
        locked = true;
        (bool success, bytes memory transactionBytes) = freelancer.call{
            value: request.amount
        }("");
        price -= request.amount;
        require(success, "Transfer failed.");
        request.paid = true;

        locked = false;

        emit RequestPaid(msg.sender, request.amount);
    }
}
