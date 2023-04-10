import React from 'react'
import { useState } from 'react';
import WEB3 from 'web3';
export default function ConductVoting() {

  const [showForm, setshowForm] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [candidateIndex, setCandidateIndex] = useState([]);
  const [voter, setVoter] = useState('');

  function handleConductVoting(){
    setshowForm(true);
  }
  function handleFormSubmit(e){
     e.preventDefault();
  }
  console.log(candidate)
  console.log(candidateIndex)
  return (
    <>
    <button onClick={handleConductVoting} >Conduct Voting</button>
    {
      showForm && 
      <form onSubmit={handleFormSubmit} >
      <label>Candidates</label>
      <input type="text" name='candidateNames' value={candidate} placeholder='Add candidates'
       onChange={(e)=> { setCandidate([...candidate,e.target.value])}}/>
      <label>Voters</label>
      <input type="text" name='Voters' placeholder='Add Voter addresses in array'/>
      <button type='submit'>Submit</button>
      </form>
    }
    <button>END VOTING</button>
    </>
  )
}
