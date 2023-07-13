import React, { useState } from 'react'
let candidateNum = 0;
function NewCoductVote(props) {
  const {contract}=props;
  const {account}=props;
  const [showForm, setshowForm] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [candidateIndex, setCandidateIndex] = useState([]);
  const [voter, setVoter] = useState("");
  const [voterIndex, setVoterIndex] = useState([]);


    function handleNewConductVoting() {
      setshowForm(true);
    }
    function handleFormSubmit(e) {
      e.preventDefault();
    }


    const adCandidates = async () => {
      ///
      let candidates = [];
      candidateIndex.map((e) => candidates.push(e.name));
      const resultofadcandidate = await contract.methods.updateCandidates(candidates).send({ from:account});
    };
  return (
    <div className='buttonClass flex border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50 flex-col  text-center items-center'>
        <button
            className="bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded p-2 m-2  text-white w-72 font-mono font-bold"
            onClick={handleNewConductVoting}
          >
            New Vote
          </button>

    {showForm && 
        <div>
          <form
          className=" p-2 max-w-d h-full w-full bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border  border-slate-50  "
          onSubmit={handleFormSubmit}
          >
                    <label className="block">
                      {" "}
                      <h2 className="text-lg font-bold ">Add Candidates </h2>{" "}
                    </label>

                    <input
                      className="bg-white text-black leading-tight"
                      type="text"
                      name="candidateNames"
                      value={candidate}
                      placeholder="Add candidate"
                      onChange={(e) => {
                        setCandidate(e.target.value);
                      }}
                    />

                    <button
                      className="relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 m-1 p-0.5"
                      type="submit"
                      onClick={(e) => {
                        setCandidateIndex([
                          ...candidateIndex,
                          { id: candidateNum++, name: candidate },
                        ]);
                      }}
                    >
                      +
                    </button>

                    <button
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5  text-center mr-2 mb-2"
                      onClick={adCandidates}
                      >
                      Add Candidates
                    </button>
                  </form>
                  <div className='text-lg font-bold border'>
                    <h1 >Candidates</h1>

                    <ul className="text-left">
                      {candidateIndex.map((candidate) => (
                        <li key={candidate.id}>
                           {candidate.name} 
                        <button
                            className="btn"
                            onClick={() => {
                              setCandidateIndex(
                                candidateIndex.filter(
                                  (a) => a.id !== candidate.id
                                )
                              );
                            }}
                          >-</button>
                          
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>
              }

    </div>
  )
}

export default NewCoductVote