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
const phisicalEmulatorUrl = "http://10.0.0.2:5142/api"
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
    const title = pages[pageId].title.split(" ")[0]
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
    let opt = postOptions
    opt.body = JSON.stringify(polyanet)
    //console.warn(postOptions)

    fetch(
      "http://10.0.0.2:5142/api/polyanets",
      //"http://localhost:5142/api/polyanets",
      //"http://192.168.1.24:8081/api/polyanets",
      //"https://localhost:44365/api/polyanets",
      //"http:localhost:59365/api/polyanets",
      {
        method: "POST",
        //Accept: "*/*",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(polyanet),
      }
    )
      .then((res) => {
        console.log("then")
        console.warn(res.status)
        console.log("Response Status:", res.status)
        return res.json()
      })
      .then(
        (res) => {
          console.log("success res")
          console.log(res.status)
        },
        (err) => {
          //debugger
          console.log("callback err")
          console.error(err)
        }
      )
      .catch((err) => {
        console.log("catched err")
        console.error(err)
      })
  },
  drawPolyanet: async (polyanet) => {
    postOptions.body = JSON.stringify(polyanet)
    fetch(
      "http://192.168.1.24:8081/api/polyanets",

      postOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json()
      })
      .then((data) => {
        // Handle the JSON response here
      })
      .catch((error) => {
        console.error("Error:", error)
        // You can log the response for further investigation
        res.text().then((text) => console.log("Response Text:", text))
      })
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
