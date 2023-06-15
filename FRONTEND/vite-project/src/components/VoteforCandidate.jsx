import React, {  useState } from "react";

let candidId = 0;
export default function VoteforCandidate(props) {
  const { contract } = props;
  const { account } = props;
  console.log(account)
  const [title, setTitle] = useState('');
  const [candidateNames, setCandidateNames] = useState([]);
  const [voting, setVoting] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState();


  
  const handleVoting = async () => {
    setIsOpen(true);
    let candidates = await contract.methods.getCandidates().call();
    let title= await contract.methods.getTitle().call();
    setTitle(title);
    const newNames = candidates.map(member => member[0])
    console.log(newNames)
    setCandidateNames([...candidateNames, ...newNames]);
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmitVote = async () => {
    console.log(selectedOption)
    contract.methods.vote(selectedOption).send({ from: account[0] }).then((err, reciept) => { if (!err) { console.log(reciept) } });
  }


  return (
    <>
      {
        !isOpen && voting  && <div className=" border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50 h-full flex flex-col items-center mt-20">
          <div className="buttonClass flex  mt-1 bg-gradient-to-r from-slate-100-200 via-red-200 to-yellow-200 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl flex-col  text-center items-center ">
            <h1 className="font-mono text-6xl font-extrabold ">
              Vote{" "}
              <b >
                SECURELY{" "}
              </b>{" "}
              <br />
              Without Hesitation
              <br />
            </h1>
          </div>
          <button
            className="btn p-2 font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-400 rounded w-44 mt-10 text-center text-neutral-200"
            onClick={handleVoting}
          >
            {" "}
            Vote{" "}
          </button>
        </div>
      }

      {
        isOpen &&  <div className="VotingCard bg- border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-thin text-cyan-50 h-full flex flex-col items-center ">


          <h1 className="text-5xl font-bold m-4-0"> {title.toUpperCase()}</h1>
          <h3 className="mb-4 font-bold text-lg text-gray-900 dark:text-white">CANDIDATES</h3>

          <ul className="text-sm font-medium w-48 h-auto  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">

            {
              candidateNames.map((name, index) => (
                <li key={index} className="w-full ">
                  <div className="flex items-center pl-3">
                    <input id={index} type="radio" name="candidate_Names" value={index} onChange={handleOptionChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 hover:cursor-pointer" />
                    <label htmlFor={name} className="w-full py-3 ml-2 text-sm font-medium text-white hover:cursor-pointer">{name}</label>
                  </div>
                </li>
              ))}
          </ul>
          <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-2 border border-gray-100" onClick={handleSubmitVote}>Submit</button>
        </div>
      }

    </>
  );
}
