import { useEffect, useState } from 'react'
import Web3 from 'web3';
import './App.css'
import ConductVoting from '../public/Components/ConductVoting';
import VoteforCandidate from '../public/Components/VoteforCandidate';
function App() {

  const [isChairperson, setIsChairperson] = useState(false)
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "chairPerson",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vote",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "canVote",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "candidateNames",
          "type": "string[]"
        }
      ],
      "name": "addCandidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "votersToBeApproved",
          "type": "address[]"
        }
      ],
      "name": "approveVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endVoting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinner",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
  //linking with ganache
  //creating instance of contract
  
  const loadWeb3=async ()=>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);      
      await window.ethereum.enable();
    }
    else if(Web3){
      window.web3= new Web3(Web3.currentProvider);      
      
    }
    else{
      window.alert('No')
    }
  }
  useEffect(() => {
    loadWeb3();
    checkIschairPerson();
  }, [])
  
  
  const checkIschairPerson = async () =>{
    const web3 = window.web3;
    let contract = new web3.eth.Contract(ABI, '0xCc3A858526EAa62a3288E1dEB8334d0CfEC92C95');
    const chairperson=await contract.methods.chairPerson().call();
    const accounts= await web3.eth.getAccounts();
    const currentUser=accounts[0];
    setIsChairperson(chairperson === currentUser);
  }

  return (
    <div className="App">
      {isChairperson && <ConductVoting />}
      <VoteforCandidate />
    </div>
  )
}

export default App;
