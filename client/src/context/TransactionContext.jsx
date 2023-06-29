import React, { useEffect, useState } from "react";
import { myContractAddress, myContractABI } from "../utils/constants.js";
import bigInt from "big-integer";
import { ethers } from "ethers";

const { ethereum } = window;

export const TransactionContext = React.createContext();

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();

  const transactionContract = new ethers.Contract(
    myContractAddress,
    myContractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
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

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionsCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (err) {
      console.log(err);
      throw new Error("No transactoins found!");
    }
  };

  const fetchAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask!");

      const transactionContract = await getEthereumContract();
      const Fetchedtransactions =
        await transactionContract.getAllTransactions();

      const TransactionsBody = Fetchedtransactions.map((el) => {
        return {
          addressFrom: el.sender,
          addressTo: el.receiver,
          timestamp: new Date(
            bigInt(Number(el.timestamp)) * 1000
          ).toLocaleString(),
          message: el.message,
          keyword: el.keyword,
          amount: bigInt(Number(el.amount)) / 10 ** 18,
        };
      });
      setTransactions(TransactionsBody);
    } catch (err) {
      console.log(err);
    }
  };

  // Checking acc connected or not
  const ifWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please install metamask!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length != 0) {
      setCurrentAccount(accounts[accounts.length - 1]);
      checkIfTransactionsExist();
      fetchAllTransactions();
    }
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

      setCurrentAccount(accounts[accounts.length - 1]);
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
      const transactionContract = await getEthereumContract();

      const parsedAmount = ethers.parseEther(amount).toString();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, currentAccount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: receiver,
            gas: "0x5208", // 21000
            value: parsedAmount,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlock(
        receiver,
        parsedAmount,
        message,
        keyword
      );

      setLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setLoading(false);

      const transactionsCount =
        await transactionContract.getTransactionsCount();

      setTransactionCount(transactionsCount);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Transaction rejected by metamask!");
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
        transactions,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
