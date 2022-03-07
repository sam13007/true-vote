var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "creek type armed onion glory laugh abandon hole adult weekend total beauty";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/v3/c5c3de9963e44cb49ee87898d32eac94");
      },
      network_id: "*"
    }
  }
};