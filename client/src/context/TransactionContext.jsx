import React, { useEffect, useState } from "react";
import { myContractAddress, myContractABI } from "../utils/constants";
const ethers = require("ethers");

const { ethereum } = window;

export const TransactionContext = React.createContext();

const getEthereumContract = () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    myContractAddress,
    myContractABI,
    signer
  );

  //   console.log(provider, signer, transactionContract);
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Checking acc connected or not
  const ifWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please install metamask!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    }

    console.log(accounts);
  };

  //   Connect account
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask!");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum objects!");
    }
  };

  //   Make Transaction
  const makeTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask!");
      }

      const { receiver, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: receiver,
            gas: "0x5208", // 21000
            value: ethers.parseEther(amount)._hex,
          },
        ],
      });
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum objects!");
    }
  };

  useEffect(() => {
    ifWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        makeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};