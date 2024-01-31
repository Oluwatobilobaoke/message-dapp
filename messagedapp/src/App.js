import logo from "./logo.svg";
import "./App.css";
import contractABI from "./abi.json";
import { useState } from "react";
const ethers = require("ethers");
const contractAddress = "0x33304C05C5e68429E64BBA8fA6F65fCd8A218E29";
function App() {
  const [inputValue, setInputValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const setMessage = async () => {
    if (!inputValue) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const newMessageTxn = await contract.setMessage(inputValue);
        await newMessageTxn.wait();
        console.log("New Message Set!");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };
  async function readMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const message = await contract.getMessage();

        // alert the message
        console.log(message);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>My Message Dapp</p>

        <div>
          <input
            type="text"
            placeholder="Enter your message"
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <button onClick={setMessage}>Set Message</button>

        <div>
          <button onClick={readMessage}>Read Message</button>
        </div>
      </header>
    </div>
  );
}

export default App;
