import react, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";

// Fethcing GIphy using API
import useFetch from "../hooks/FetchGiphy";

const shortenAddress = (addr) => {
  return `${addr.substr(0, 5)}...${addr.substr(addr.length - 4)}`;
};

const TransactionCard = ({
  addressFrom,
  addressTo,
  message,
  keyword,
  timestamp,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword });
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex flex-row w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12  px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl my-2 text-center">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl my-2 text-center">
            Connect account to your see latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions
            .slice(0)
            .reverse()
            .map((el, i) => <TransactionCard key={i} {...el} />)
            .filter((el, index) => index < 15)}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
