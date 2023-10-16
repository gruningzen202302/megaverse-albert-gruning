const Api = {
  btcUrl: "https://api.coindesk.com/v1/bpi/currentprice.json",
  errorTestUrl:
    "this url does not exist expected TypeError Network request failed",
  get: fetch("https://api.coindesk.com/v1/bpi/currentprice.json"),
  post: "post endpoint",
}

export default Api