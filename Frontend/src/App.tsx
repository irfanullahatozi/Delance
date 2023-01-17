import React, { useEffect, useState } from 'react';
import Header from './components/header';
import { ethers } from "ethers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProject from './components/createproject';
import ResuableCard from './components/ResuableCard';
import Home from './components/home';
import AllProjects from './components/viewallprojects';
import AllAsignProject from './components/viewallasignproject';
import Detail from './components/assigndetail';
import SendedDetail from './components/sendeddetail';

const App: React.FC = () => {

  const [balance, setBalance] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("")

  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner();
  const contractAddress: string = "0xcf9fa2f9aebd698d7ad56f3fa3e5920efb947779"

  console.log("Signer", signer)

  useEffect(() => {
    connectWallet();
  }, [])


  const connectWallet = async () => {
    if (provider) {
      console.log("Meta mask detected!");
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = ethers.utils.formatEther(balance);
        setWalletAddress(accounts[0]);
        console.log(balanceInEth)
        setBalance(Number(balanceInEth));
      } catch (error) {
        console.log("Error in connecting");
      }
    } else {
      alert("Please install meta mask");
    }
  };

  return (
    <div className="App">
      <Header />
      {/* <Home/> */}
      <ResuableCard walletaddress={walletAddress} balance={balance} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproject" element={<CreateProject walletaddress={walletAddress} contractaddress={contractAddress} />} />
          <Route path="/getallproject" element={<AllProjects walletaddress={walletAddress} contractaddress={contractAddress} provider={provider} />} />
          <Route path="/getassignedproject" element={<AllAsignProject walletaddress={walletAddress} contractaddress={contractAddress} provider={provider} />} />
          <Route path="/assigndetail/:projectaddress" element={<Detail provider={provider} />} />
          <Route path="/sendprojectdetail/:projectaddress" element={<SendedDetail provider={provider} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
