import logo from "./logo.svg";
import "./App.css";
import contractABI from "./abi.json";
const ethers = require("ethers");
const contractAddress = "0x33304C05C5e68429E64BBA8fA6F65fCd8A218E29";

function App() {
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }


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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <button onClick={readMessage}>Read Message</button>
        </div>
      </header>
    </div>
  );
}

export default App;
