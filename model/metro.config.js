import { getDefaultConfig } from "metro-config"

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()
  return {
    resolver: {
      // ...
    },
    transformer: {
      // ...
    },
    server: {
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:5142", // Your local API URL
      //     secure: false, // If your API is not using HTTPS, set this to false
      //   },
      // },
    },
  }
})()
