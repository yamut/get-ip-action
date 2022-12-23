import * as core from '@actions/core'
import {HttpClient} from '@actions/http-client'

interface GetIpResponse {
  ip: string
}
async function run(): Promise<void> {
  try {
    const apiKey: string = core.getInput('api_key')
    const endpointUrl: string = core.getInput('endpoint_url')
    const http = new HttpClient('get-ip-action', undefined, {
      allowRetries: true,
      maxRetries: 2
    })
    http.requestOptions = {
      headers: {
        'x-api-key': apiKey
      }
    }
    const ip = await http.getJson<GetIpResponse>(endpointUrl)
    core.setOutput('ip', ip.result?.ip)
    core.info(`ip: ${ip.result?.ip}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
