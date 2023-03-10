// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Project.sol";



contract ProjectFactory {
    Project[] public deployedProjects;

    mapping(address => Project[]) public employerProjects;
    mapping(address => Project[]) public freelancerProjects;

    function addEmployerProjects(address _employerAddr, Project _project)
        internal
    {
        employerProjects[_employerAddr].push(_project);
    }

    function addFreelancerProjects(address _freelancerAddr, Project _project)
        internal
    {
        freelancerProjects[_freelancerAddr].push(_project);
    }

    function getEmployerProjects(address _employerAddr)
        public
        view
        returns (Project[] memory)
    {
        return employerProjects[_employerAddr];
    }

    function getFreelancerProjects(address _freelancerAddr)
        public
        view
        returns (Project[] memory)
    {
        return freelancerProjects[_freelancerAddr];
    }

    function createProject(address payable _freelancer, uint256 _deadline)
        public
        payable
    {
        require(msg.value > 0, "Low price!");
        Project project = new Project (
            payable(msg.sender),
            _freelancer,
            _deadline,
            msg.value
        );

        deployedProjects.push(project);
        addEmployerProjects(msg.sender, project);
        addFreelancerProjects(_freelancer, project);

        address payable receiver = payable(address(project));
        receiver.transfer(msg.value);
    }

    function getDeployedProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}