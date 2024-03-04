"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [currentData, setCurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setUserAddress(accounts[0]);
  };

  const [mintingAmount, setMintingAmount] = useState<number>();
  const [mintingSubmitted, setMintingSubmitted] = useState(false);
  const [mintingTransactionHash, setMintingTransactionHash] = useState("");

  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mintos(signer, mintingAmount);
      await tx.wait();
      setMintingSubmitted(true);
      setMintingTransactionHash(tx.hash);
    } catch (error: any) {
      const decodedError = contract.interface.parseError(error.data);
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

  const [stakingAmount, setStakingAmount] = useState<number>();
  const [stakingSubmitted, setStakingSubmitted] = useState(false);
  const [stakingTransactionHash, setStakingTransactionHash] = useState("");

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stakos(stakingAmount);
      await tx.wait();
      setStakingSubmitted(true);
      setStakingTransactionHash(tx.hash);
    } catch (error: any) {
      const decodedError = contract.interface.parseError(error.data);
      alert(`Staking failed: ${decodedError?.args}`);
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

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setMintingSubmitted(true);
      setMintingTransactionHash(tx.hash);
    } catch (error: any) {
      const decodedError = contract.interface.parseError(error.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };


  return (
<main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
  <header style={{ marginBottom: "20px", textAlign: "center" }}>
    <h1 style={{ fontSize: "24px", color: "#333" }}>Welcome to Your Token Management</h1>
  </header>

  <section className="btn-section" style={{ textAlign: "center", marginBottom: "20px" }}>
    <button onClick={connectWallet} className={`p-3 ${userAddress ? "bg-blue-500" : "bg-green-500"} text-white rounded`}>
      {userAddress ? `Connected: ${userAddress}` : "Connect Wallet"}
    </button>
  </section>

  <section style={{ textAlign: "center", marginBottom: "20px" }}>
    <form>
      <label style={{ fontSize: "16px", color: "#555" }}>Mint Amount</label><br />
    </form>
    <input type="text" value={mintingAmount || ""} onChange={(e) => mintAmountChange(e)} style={{ color: "#333", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", marginBottom: "10px" }} /><br />
    <button onClick={mintCoin} className={`p-3 ${mintingAmount ? "bg-blue-500" : "bg-yellow-500"} text-white rounded`}>
      {mintingAmount ? "GO" : "Mint Token"}
    </button>
  </section>

  <section style={{ textAlign: "center", marginBottom: "20px" }}>
    <form>
      <label style={{ fontSize: "16px", color: "#555" }}>Stake Amount</label><br />
    </form>
    <input type="text" value={stakingAmount || ""} onChange={(e) => stakeAmountChange(e)} style={{ color: "#333", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", marginBottom: "10px" }} /><br />
    <button onClick={stakeCoin} className={`p-3 ${stakingAmount ? "bg-blue-500" : "bg-orange-500"} text-white rounded`}>
      {stakingAmount ? "GO" : "Stake Token"}
    </button>
  </section>

  <section style={{ textAlign: "center" }}>
    <br /><br />
    <button onClick={withdrawCoin} className="p-3 bg-red-500 text-white rounded">Withdraw</button>
  </section>
</main>

  );
}
