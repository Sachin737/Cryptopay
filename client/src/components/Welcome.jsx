// import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./Loader.jsx";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";

const Input = ({ placeholder, name, type, value, inputHandler }) => {
  return (
    <input
      required
      type={type}
      step="0.0001"
      value={value}
      placeholder={placeholder}
      onChange={(e) => inputHandler(e, name)}
      className="w-full my-2 p-2 rounded-sm outline-none bg-transparent text-white border-none text-start white-glassmorphism"
    />
  );
};

const genericStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const {
    makeTransaction,
    connectWallet,
    formData,
    handleChange,
    currentAccount,
    loading,
  } = useContext(TransactionContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const { receiver, amount, keyword, message } = formData;

    if (!receiver || !amount || !message || !keyword) {
      console.log("Provide all information");
      return;
    }

    makeTransaction();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-start justify-between px-4 py-12 mt-12 mf:flex-row mf:p-20">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 mf:mx-5">
          <h1 className="text-white text-gradient py-1 text-3xl sm:text-5xl">
            Send Crypto <br />
            Fast, Easy, and Secure
          </h1>
          <p className="text-white font-light text-left mt-5 mf:w-9/12 w-11/12 text-base">
            Your homely portal to Buy and sell <br /> crypto across the world in
            just a single click.
          </p>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#6621dcf4] p-3 rounded-full hover:bg-[#6721dcbf] cursor-pointer"
            >
              <p className="text-base text-white font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid grid-cols-2 w-full mt-10 sm:grid-cols-3">
            <div className={`${genericStyles} rounded-tl-2xl`}>Reliability</div>
            <div className={`${genericStyles} rounded-tr-2xl sm:rounded-none`}>
              Secure
            </div>
            <div className={`${genericStyles} sm:rounded-tr-2xl`}>Ethereum</div>
            <div className={`${genericStyles} sm:rounded-bl-2xl`}>Web 3.0</div>
            <div className={`${genericStyles} rounded-bl-2xl sm:rounded-none`}>
              Low Gas
            </div>
            <div className={`${genericStyles} rounded-br-2xl`}>BlockChain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10  mf:mx-5">
          <div className="flex-col justify-end items-start rounded-xl h-44 w-full sm:w-72 my-5 eth-card white-glassmorphism p-3">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-between items-center">
                <div className=" flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
                  <SiEthereum fontSize={21} color="#fff"></SiEthereum>
                </div>
                <BsInfoCircle fontSize={18} color="#fff"></BsInfoCircle>
              </div>
              <div>
                {!currentAccount ? (
                  <p className="text-white font-light text-sm">0x000....000</p>
                ) : (
                  <p className="text-white font-light text-sm">
                    {currentAccount.substr(0, 5)}...
                    {currentAccount.substr(currentAccount.length - 4)}
                  </p>
                )}
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col justify-start items-center blue-glassmorphism p-5 w-full mt-8 sm:w-96 ">
            <Input
              placeholder="Receiver address"
              name="receiver"
              type="text"
              inputHandler={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              inputHandler={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              inputHandler={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              inputHandler={handleChange}
            />

            <div className="h-[1px] my-2  w-full bg-gray-400"></div>

            {loading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={submitHandler}
                className=" text-white w-full mt-2 p-2 border-[#3d4f7c] border-[1px] rounded-full cursor-pointer hover:bg-[#202D57]"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
