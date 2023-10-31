import Model from "./model/model"
import Secrets from "./secrets"

const POST = "POST"

let postOptions = {
  method: "POST",
  //mode: "cors",
  headers: {
    "Content-Type": "application/json",
    //Accept: "application/json",
  },
  body: "",
}
const candidateId = Secrets.candidateId
const baseUrl = "https://challenge.crossmint.io/api"
const proxyUrl = "http://192.168.1.24:8081/api"
const dotNetUrl = "http://localhost:5142/api"
const phisicalEmulatorUrl = "http://10.0.2.2:5142/api"
const polyanetsEndpoint = baseUrl +'/'+"polyanets"
const soloonsEndpoint = baseUrl +'/'+ "soloons"
const comethsEndpoint = baseUrl +'/'+"comeths"
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
  polyanets: baseUrl + "/" + polyanetsEndpoint,
  soloons: baseUrl + "/" + soloonsEndpoint,
  comeths: baseUrl + "/" + comethsEndpoint,
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
        //console.log("response ok")
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
    const title = pages[pageId].title.split(" ")[0] // +" "+ pages[pageId].title.split(" ")[1]
    const footer = title + " Gruning " + new Date().getFullYear()
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
  postPolyanet: async (polyanet) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "candidateId": "d7e13a9a-1e20-4b35-a594-630ec4bfb9a9",
      "row": polyanet.row,
      "column": polyanet.column
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://challenge.crossmint.io/api/polyanets", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  },
  postMegaverseStageTwo:async(pixel, type)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "candidateId": "d7e13a9a-1e20-4b35-a594-630ec4bfb9a9",
      "row": pixel.row,
      "column": pixel.column
    });
    switch (type) {
      case "polyanets":
        console.log("polyanets")
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // fetch("https://challenge.crossmint.io/api/polyanets", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    
  },
  getPolyanets: async () => {
    console.log("getPolyanets method")
    console.log(phisicalEmulatorUrl + "/polyanets")
    let res = await fetch(phisicalEmulatorUrl + "/polyanets")
      .then((res) => {
        return res.json()
      })
      .then(
        (res) => {
          console.warn(res)
        },
        (err) => {
          console.error("API error " + err)
          result = { error: true, result: err }
        }
      )
      .catch((err) => {
        console.error(err)
      })
  },
}

export default Api
