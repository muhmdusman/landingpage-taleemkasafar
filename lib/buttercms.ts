import "server-only"

import Butter from "buttercms"

let butterClient: ReturnType<typeof Butter> | null = null

export function getButterClient() {
  const apiToken = process.env.BUTTER_CMS_API_TOKEN

  if (!apiToken) {
    throw new Error("Missing BUTTER_CMS_API_TOKEN environment variable")
  }

  butterClient ??= Butter(apiToken)

  return butterClient
}
