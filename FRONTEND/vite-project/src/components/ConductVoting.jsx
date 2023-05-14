import React from "react";
import { useState } from "react";

let candidateNum = 0;
let voterId = 0;

export default function ConductVoting(props) {
  const { contract } = props;
  const [showForm, setshowForm] = useState(false);
  const [candidate, setCandidate] = useState("");
  const [candidateIndex, setCandidateIndex] = useState([]);
  const [voter, setVoter] = useState("");
  const [voterIndex, setVoterIndex] = useState([]);
  function handleConductVoting() {
    setshowForm(true);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  console.log(candidateIndex);
  console.log(contract);
  //using smartContract
  const adCandidates = async () => {
    ///
    let candidates = [];
    candidateIndex.map((e) => candidates.push(e.name));
    const resultofadcandidate = await contract.methods
      .addCandidates(candidates)
      .send({ from: "0x1dB5f56aeB891e77AcF735969dc608fA18bb8C4B" });
    console.log(resultofadcandidate);
  };
  const adAccounts = async () => {
    ///
    let accounts = [];
    voterIndex.map((e) => accounts.push(e.name));
    const resultofadaccount = await contract.methods
      .approveVoter(accounts)
      .send({ from: "0x1dB5f56aeB891e77AcF735969dc608fA18bb8C4B" });
    console.log(resultofadaccount);
  };
  // console.log(Contract)
  // console.log(web3)
  // console.log(candidateIndex)
  return (
    <>
      {!showForm ? (
        <div className="buttonClass flex border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50 flex-col  text-center items-center mt-16">

          <button
            className="bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded p-2 m-2  text-white w-72 font-mono font-bold"
            onClick={handleConductVoting}
          >
            Conduct Voting
          </button>
        </div>
      ) : (
        showForm && (
          <div className="formWaliClass flex-row justify-center bg-gradient-to-r from-green-200 via-green-400 to-purple-700 text-black font-mono">
            <div className="formClass  py-2 px-4 rounded">
              {showForm && (
                <div className="formWrap w-full p-2">
                  <form
                    className=" p-2 max-w-d h-full w-full bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border  border-slate-50  "
                    onSubmit={handleFormSubmit}
                  >
                    <label className="block">
                      {" "}
                      <h2 className="text-lg "> Candidates </h2>{" "}
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

                    <label className="block">
                      <h1>Voters</h1>{" "}
                    </label>
                    <input
                      className="leading-tight text-black "
                      id="inputVoters"
                      type="text"
                      name="Voters"
                      placeholder="Add address"
                      value={voter}
                      onChange={(e) => {
                        setVoter(e.target.value);
                      }}
                    />
                    <button
                      className="relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 m-1 p-0.5"
                      type="submit"
                      onClick={() => {
                        setVoterIndex([
                          ...voterIndex,
                          { id: voterId++, name: voter },
                        ]);
                        {
                          document.getElementById("inputVoters").value = "";
                        }
                      }}
                    >
                      +{" "}
                    </button>

                    <button
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-5  text-center mr-2 mb-2"
                      onClick={adAccounts}
                    >
                      AddVoters
                    </button>
                  </form>
                </div>
              )}
            </div>
            <div className="candidateandVoters flex p-2 ">
              <div className="child1 w-1/2    p-2 m-1  h-full  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                {showForm && (
                  <div>
                    <h1>Candidates</h1>

                    <ul className="text-left">
                      {candidateIndex.map((candidate) => (
                        <li key={candidate.id}>
                          {candidate.name}{" "}
                          <button
                            className="btn"
                            onClick={() => {
                              setCandidateIndex(
                                candidateIndex.filter(
                                  (a) => a.id !== candidate.id
                                )
                              );
                            }}
                          >
                            -
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="child2   p-2 m-1 h-full w-1/2 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                {showForm && (
                  <div className="  text-start  rounded">
                    <h1>Voters</h1>
                    <ul>
                      {voterIndex.map((voter) => (
                        <li key={voter.id}>
                          {voter.name}{" "}
                          <button
                            className="btn h-2 border-black"
                            onClick={() => {
                              setVoterIndex(
                                voterIndex.filter((a) => a.id !== voter.id)
                              );
                            }}
                          >
                            -
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
