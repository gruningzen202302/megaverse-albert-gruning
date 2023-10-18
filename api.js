import Secrets from "./secrets"

const candidateId = Secrets.candidateId
const baseUrl = "https://challenge.crossmint.io/api"
const polyanets = "polyanets"
const soloons = "soloons"
const comeths = "comeths"
const btcUrl = "https://api.coindesk.com/v1/bpi/currentprice.json"
const placeHolderUrl = "https://jsonplaceholder.typicode.com/posts/1"

const Api = {
  btcUrl: btcUrl,
  errorTestUrl:
    "this url does not exist expected TypeError Network request failed",
  placeHolderUrl: placeHolderUrl,
  polyanets: baseUrl + "/" + polyanets,
  soloons: baseUrl + "/" + soloons,
  comeths: baseUrl + "/" + comeths,
  getFromJsonPlaceholder: async () => {
    let res = await fetch(placeHolderUrl)
    let formattedRes = await res.json()
    console.warn(formattedRes?.title)
  },
  getBtc:()=>{
      fetch(btcUrl)
      .then((res) => res.json())
      .then(
        (res) => {
          return {error:false, result:res}
        },
        (err) => {
          return {error:true, result:err}
        }
      )
  }
}

export default Api
