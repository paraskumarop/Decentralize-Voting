// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        uint256 vote; //candidate index basical
        bool hasVoted; //voted or not
        bool canVote; // approved or not
    }
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    bool votingEnded = false;
    address public chairPerson;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    constructor() {
        chairPerson = msg.sender;
    }

    modifier onlyChairperson() {
        require(msg.sender == chairPerson);
        _;
    }

    function addCandidates(string[] memory candidateNames) public onlyChairperson {
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], voteCount: 0}));
        }
    }


    function approveVoter(
        address[] memory votersToBeApproved
    ) public onlyChairperson {
        for (uint256 i = 0; i < votersToBeApproved.length; i++) {
            voters[votersToBeApproved[i]].canVote = true;
        }
    }

    function vote(uint256 candidateIndex) public {
        Voter storage sender = voters[msg.sender];
        require(!votingEnded, "Voting is ended");
        require(!sender.hasVoted, "bss kar bhai kitni baar vote krega");
        require(sender.canVote, "you are not Approved voter");
        sender.hasVoted = true;
        candidates[candidateIndex].voteCount++;
        sender.vote = candidateIndex;
    }

    function endVoting() public onlyChairperson {
        require(!votingEnded, "Voting is already ended");
        votingEnded = true;
    }

    function getWinner() public view onlyChairperson returns (string memory) {
        uint maxVotes = 0;
        string memory winner;
        require(votingEnded, "Voting is not Ended Yet");
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winner = candidates[i].name;
            }
        }
        return winner;
    }
}