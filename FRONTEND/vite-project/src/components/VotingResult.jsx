import { useState } from "react";
import React from 'react'

function VotingResult(props) {
    const [votinEnded, setVotinEnded] = useState(false);
    const [winner, setWinner] = useState('');
    const { contract, account } = props;
    const handleEndVoting=async()=>{
        const result = await contract.methods.endVoting().send({ from: account[0] });
        setVotinEnded(true)
    }
    const handleGetWinner = async () => {
        if(votinEnded){

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
            <button disabled={votinEnded=='false'} className='btn p-2 font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-400 rounded w-44 mt-10 text-center text-neutral-200'  onClick={handleEndVoting}>End Voting</button>
            <button  className='btn p-2 font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-400 rounded w-44 mt-10 text-center text-neutral-200' onClick={handleGetWinner} >
               Get WInner    </button>
            <h1>{winner}</h1>
        </div>
    )
}

export default VotingResult