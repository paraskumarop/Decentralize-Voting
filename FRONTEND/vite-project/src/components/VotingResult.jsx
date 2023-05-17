import { useEffect, useState } from "react";
import React from 'react'

function VotingResult(props) {
    const {isChairperson}=props;
    const [votinEnded, setVotinEnded] = useState(false);
    const [votingEndedClicked,setVotingEndedClicked]=useState(false)
    const [winner, setWinner] = useState('');
    const { contract, account } = props;
    // useEffect( () => {
    //     let votinEnd;
    //     (async ()=>{

    //         votinEnd =await contract.methods.votingEnded().call({from: account[0]}); 
    //         console.log(votinEnd);
          
    //     })
    //     console.log(votinEnd)
    //     console.log('hilo')
    // }, [])
    
    const handleEndVoting=async()=>{
        setVotingEndedClicked(true);
        const result = await contract.methods.endVoting().send({ from: account[0] });
        setVotinEnded(true)
        console.lohg(result)
    }
    const handleGetWinner = async () => {
        let votinEnd =await contract.methods.votingEnded().call({from: account[0]});   
        if(votinEnd){
            const winner = await contract.methods.getWinner().call();
            setWinner(winner);
            setVotinEnded(true);
            console.log(winner)
        }
        else{
            console.log("Voting is Not Ended yet")
        }
    }
    return (
        <div className=' border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50 h-full flex flex-col items-center '>
            { isChairperson && <button disabled={votinEnded=='false'} className='btn p-2 font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-400 rounded w-44 mt-10 text-center text-neutral-200'  onClick={handleEndVoting}>End Voting</button>}
            {(votinEnded || isChairperson) &&
             <button  className='btn p-2 font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-400 rounded w-44 mt-10 text-center text-neutral-200' onClick={handleGetWinner} >
               Get WInner    </button>}
        <div/>
        {(votinEnded || votingEndedClicked) &&  <h1 className="text-xl font-bold">The winner is {winner}  </h1> }
               
            

        </div>
    )
}

export default VotingResult