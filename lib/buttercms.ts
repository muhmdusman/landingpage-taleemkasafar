import "server-only"

import Butter from "buttercms"

const apiToken = process.env.BUTTER_CMS_API_TOKEN

if (!apiToken) {
  throw new Error("Missing BUTTER_CMS_API_TOKEN environment variable")
}

const butter = Butter(apiToken)

export default butter
