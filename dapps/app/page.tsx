"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>
 //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
return (
    <main   style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url('https://media.licdn.com/dms/image/D5603AQHpFF6YenlUHw/profile-displayphoto-shrink_800_800/0/1688433080123?e=1714608000&v=beta&t=GQVkjUW92nb2x2UEhIphe5RqFOfQ0urkoEpZ38jUgXI')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',}}>
          <button onClick={() => {connectWallet();}}
        className="p-3 bg-black text-white rounded"
      >
        {walletKey != "" ? walletKey : " Connect wallet"}
      </button>

      <div style={{ textAlign: "center" }}>
      <br></br>
      <form>
        <label> Mint Amount</label><br></br>
        </form>
      <input
        type="text"
        value = {mintingAmount || ""}
        onChange = {(e) => mintAmountChange(e)}
        style={{color:"Black"}}
      />
      <br></br>
      <button 
        onClick={() => {mintCoin();}}
        className="p-3 p-3 bg-black text-white rounded"
      >
        {"Mint Token"}
      </button> 
      
    </div>
    <br></br>

<div style={{ textAlign: "center" }}>
<form>
    <label> Stake Amount</label><br></br>
    </form>
  <input
    type="text"
    value = {stakingAmount || ""}
    onChange = {(e) => stakeAmountChange(e)}
    style={{color:"Black"}}
  />
  <br></br>
 
  <button 
    onClick={stakeCoin}
    className="p-3 bg-black text-white rounded"
  >
    {"Stake Token"}
  </button> 
</div>

<div>
    <br></br>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-black text-white rounded"
      >
        {"Withdraw"}
      </button> 
      </div>

    </main>
  );
}