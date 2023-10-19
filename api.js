import Secrets from "./secrets"

const candidateId = Secrets.candidateId
const baseUrl = "https://challenge.crossmint.io/api"
const polyanets = "polyanets"
const soloons = "soloons"
const comeths = "comeths"
const btcUrl = "https://api.coindesk.com/v1/bpi/currentprice.json"
const placeHolderUrl = "https://jsonplaceholder.typicode.com/posts/1"
const wikipediaUrl =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=Albert_Einstein"

let result = {}

const Api = {
  btcUrl: btcUrl,
  errorTestUrl:
    "this url does not exist expected TypeError Network request failed",
  placeHolderUrl: placeHolderUrl,
  polyanets: baseUrl + "/" + polyanets,
  soloons: baseUrl + "/" + soloons,
  comeths: baseUrl + "/" + comeths,
  getFromJsonPlaceholder: async () => {
    try {
      let res = await fetch(placeHolderUrl)
      console.error("res " + res)
      let formattedRes = await res.json()
      console.warn("LOREM " + formattedRes?.title)
    } catch (err) {
      const error = await err.json()
      console.error("error " + error)
    }
  },
  getBtc: () => {
    fetch(btcUrl)
      .then((res) => res.json())
      .then(
        (res) => {
          return { error: false, result: res }
        },
        (err) => {
          return { error: true, result: err }
        }
      )
  },
  getWiki: async () => {
    let response = { resultWiki: undefined }
    try {
      response = await fetch(wikipediaUrl)
      if (response.ok) {
        console.log("response ok")
      } else {
        msg = "Network response was not ok"
        console.error(msg)
      }
    } catch (err) {
      msg = "Error catched: " + err
      console.error(msg)
    }

    const data = await response.json()
    const pages = data.query.pages
    const pageId = Object.keys(pages)[0]
    const title = pages[pageId].title.split(" ")[0]
    const footer = title + " Gruning " + new Date().getFullYear()
    //console.warn(footer)
    response.resultWiki = footer
    return response
  },
  getWikiCallback: async () => {
    fetch(wikipediaUrl)
      .then((res) => res.json())
      .then(
        (res) => {
          const pages = res.query.pages
          const pageId = Object.keys(pages)[0]
          const title = pages[pageId].title.split(" ")[0]
          const footer = title + " Gruning " + new Date().getFullYear()
          console.warn(footer)
        },
        (err) => {
          console.error("API error " + err)
          result = { error: true, result: err }
        }
      )
      .catch((err) => {
        console.error("catched error " + err)
        result = { error: true, result: err }
      })
  },
}

export default Api
