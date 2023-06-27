require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/BV-gbwG76PSPsvG4bkgNKnNsj-m7_ZvZ",
      accounts: [
        "d9f7973dbfbf4836bde69cb3c818aff8cb1cd7a1ff74423240599b83f94839c0",
      ],
    },
  },
};
