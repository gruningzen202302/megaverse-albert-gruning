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

  polyanet: {
    candidateId: Secrets.candidateId,
    row: 10,
    column: 10,
  },

  soloon: {
    candidateId: candidateId.toString(),
    row: 10,
    column: 10,
    color: Emoji.blue.toString(),
  },
  cometh: {
    candidateId: candidateId.toString(),
    row: 10,
    column: 10,
    direction: Emoji.up.toString(),
  },
}

export default Model
