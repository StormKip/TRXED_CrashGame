module.exports = {
  networks: {
    development: {
      privateKey: '0bed40c9021ded4ac8ab1e42b36aa203df2fa0738b6da6afe6efdee5f57978be',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "http://127.0.0.1:9090",
      solidityNode: "http://127.0.0.1:9090",
      eventServer: "http://127.0.0.1:9090",

      network_id: "*"
    },
    mainnet: {
// Don't put your private key here:
      privateKey: process.env.PK,
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "https://api.trongrid.io",
      solidityNode: "https://api.trongrid.io",
      eventServer: "https://api.trongrid.io",

      network_id: "*"
    },
    shasta: {
      privateKey: '0bed40c9021ded4ac8ab1e42b36aa203df2fa0738b6da6afe6efdee5f57978be',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",

      network_id: "*"
    }
  }
}
