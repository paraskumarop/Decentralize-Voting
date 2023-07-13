import { useEffect, useState } from "react";

import "./App.css";
import ConductVoting from "./components/ConductVoting";
import VoteforCandidate from "./components/VoteforCandidate";
import VotingResult from "./components/VotingResult";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewCoductVote from "./components/NewCoductVote";
import GetWeb from "./components/GetWeb";


const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "_approvedAddresses",
        type: "address[]",
      },
    ],
    name: "ApproveVoter",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "chairPerson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "hasVoted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "canVote",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "votingEnded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames",
        type: "string[]",
      },
    ],
    name: "addCandidates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "addTitle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTitle",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "newCandidatesNames",
        type: "string[]",
      },
    ],
    name: "updateCandidates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "votersToBeApproved",
        type: "address[]",
      },
    ],
    name: "approveVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "candidateIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "endVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getWinner",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const contractAddress = "0x7A806F129BF2c5a37DbceF55C014be1B1e46f746";
function App() {
  const [isChairperson, setIsChairperson] = useState(false);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState();
  
  
  useEffect(() => {
    try {
      const handleWeb3 = async () => {
        const Web3 = await GetWeb();
        setWeb3(Web3);
        const accounts = await Web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contract = new Web3.eth.Contract(ABI, contractAddress);
        setContract(contract);
        const chairperson = await contract.methods.chairPerson().call();
        const currentUser = accounts[0];
        setContract(contract);
        setIsChairperson(chairperson === currentUser);
      }
      handleWeb3();
      
    } catch (error) {
      console.log(error)
    }
  }, []);
  
  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  });

  return (
    <div className="App  border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50  ">
      <Navbar account={account} />
      {<VoteforCandidate contract={contract} account={account} />}
      {isChairperson && <ConductVoting contract={contract} account={account} />}
      {isChairperson && <NewCoductVote contract={contract} account={account} />}
      <VotingResult
        isChairperson={isChairperson}
        contract={contract}
        account={account}
      />
      <Footer />
    </div>
  );
}

export default App;
