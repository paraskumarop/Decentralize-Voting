import React, { useEffect } from 'react'

function Navbar(props) {

    const {account}=props;
   
    
  return (
    <div>
        
<nav className=" border-gray-200 bg-gradient-to-r from-green-200 via-green-400 to-purple-700 font-mono text-cyan-50">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MIMOTE</span>
        </a>
        <div className="flex items-center">
            <a href="tel:5541251234" className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">Account: {account}</a>
        </div>
    </div>
</nav>


    </div>
  )
}

export default Navbar