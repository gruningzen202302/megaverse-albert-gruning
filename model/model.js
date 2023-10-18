import Emoji from "../assets/emojiPixels"
import Secrets from "../secrets"

const candidateId = Secrets.candidateId
const baseUrl = "https://challenge.crossmint.io/api"
const polyanets = "polyanets"
const soloons = "soloons"
const comeths = "comeths"
const rows = 11
const columns = 11

const Model = {
  rows: rows,
  columns: columns,

  polyanets: {
    candidateId: candidateId.toString(),
    row: 10,
    column: 10,
  },

  soloons: {
    candidateId: candidateId.toString(),
    row: 10,
    column: 10,
    color: Emoji.blue.toString(),
  },
  comeths: {
    candidateId: candidateId.toString(),
    row: 10,
    column: 10,
    direction: Emoji.up.toString(),
  },
}

export default Model
