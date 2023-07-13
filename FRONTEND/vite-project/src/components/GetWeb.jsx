import React, { useEffect } from 'react'
import Web3 from 'web3';
async function GetWeb() {

    let web3;
        try {
            if (typeof window.ethereum !== `undefined`) {
              web3 = new Web3(window.ethereum);
              await window.ethereum.enable();
            } else if (typeof window.web3 !== `undefined`) {
              web3 = new Web3(window.web3);
            } else {
              console.log("No wallet Found");
            }
      
          } catch (error) {
            console.log(error);
          }
  return web3;
}

export default GetWeb;