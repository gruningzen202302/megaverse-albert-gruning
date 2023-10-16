import Secrets from "../secrets"

const candidateId = Secrets.candidateId
const baseUrl = "https://challenge.crossmint.io/api"
const polyanets = "polyanets"
const soloons = "soloons"
const comeths = "comeths"

const Api = {
  btcUrl: "https://api.coindesk.com/v1/bpi/currentprice.json",
  errorTestUrl:
    "this url does not exist expected TypeError Network request failed",
  polyanets: baseUrl + "/" + polyanets,
  soloons: baseUrl + "/" + soloons,
  comeths: baseUrl + "/" + comeths,
}

export default Api
