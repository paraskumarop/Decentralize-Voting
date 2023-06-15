import { useEffect, useState} from 'react'
// import {detectEthereumProvider} from '@metamask/detect-provider';
import Web3 from 'web3';
import './App.css'
import ConductVoting from './components/ConductVoting';
import VoteforCandidate from './components/VoteforCandidate';
import VotingResult from './components/VotingResult';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewCoductVote from './components/NewCoductVote';


const ABI =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "_approvedAddresses",
        "type": "address[]"
      }
    ],
    "name": "ApproveVoter",
    "type": "event"
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
    "inputs": [],
    "name": "votingEnded",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
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
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "addTitle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTitle",
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
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "newCandidatesNames",
        "type": "string[]"
      }
    ],
    "name": "updateCandidates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
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
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]

const contractAddress='0xC9410A933CFd624A549a43335aAee15a9D964272';
function App() {

  const [isChairperson, setIsChairperson] = useState(false)
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const web3 = new Web3(window.ethereum);   
  
 
  
                                  // ********linking of Metamask**************
  // const loadWeb3=async ()=>{
  //   if(typeof window.ethereum !== 'undefined')
    
  //   try {
      
  //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   } catch (error) {
  //     window.alert('No Wallet Found ! Install Metamask',error);
  //   }
  //   else if(Web3){
  //     const web3= new Web3(Web3.currentProvider);      
  //     // setHasMetamask(true);
      
  //   }
  //   else{
  //     window.alert('No')
  //   }
  // }
  
    useEffect(() => {
      // loadWeb3();
      checkIschairPerson();
    }, [])
    
    const checkIschairPerson = async () =>{ 
    const Contract = new web3.eth.Contract(ABI, contractAddress);
    const chairperson=await Contract.methods.chairPerson().call();
    const accounts= await web3.eth.getAccounts();
    setAccount(accounts);
    const currentUser=accounts[0];
    setContract(Contract);
    setIsChairperson(chairperson === currentUser);
  }
  
  return (
    <div className="App  border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50  ">
      <Navbar account={account}/>
       {  <VoteforCandidate contract={contract} account={account}/>}  
      {isChairperson && <ConductVoting  contract={contract}account={account} />}
      {isChairperson && <NewCoductVote contract={contract} account={account}/>}
       <VotingResult isChairperson={isChairperson} contract={contract} account={account}/>
      <Footer/>
      </div>
  )
}

export default App;
