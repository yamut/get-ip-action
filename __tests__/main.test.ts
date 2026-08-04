import {jest, describe, beforeEach, it, expect} from '@jest/globals'

const getInput = jest.fn<(name: string) => string>()
const setOutput = jest.fn()
const setFailed = jest.fn()
const info = jest.fn()
const getJson = jest.fn()

jest.unstable_mockModule('@actions/core', () => ({
  getInput,
  setOutput,
  setFailed,
  info
}))

jest.unstable_mockModule('@actions/http-client', () => ({
  HttpClient: jest
    .fn()
    .mockImplementation(() => ({getJson, requestOptions: undefined}))
}))

const {run} = await import('../src/main.js')

describe('run', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the ip output from the endpoint response', async () => {
    getInput.mockImplementation(name => {
      if (name === 'api_key') return 'test-api-key'
      if (name === 'endpoint_url') return 'https://example.com/ip'
      return ''
    })
    getJson.mockResolvedValue({result: {ip: '1.2.3.4'}})

    await run()

    expect(getJson).toHaveBeenCalledWith('https://example.com/ip')
    expect(setOutput).toHaveBeenCalledWith('ip', '1.2.3.4')
  })

  it('fails the action when the request throws', async () => {
    getInput.mockReturnValue('')
    getJson.mockRejectedValue(new Error('request failed'))

    await run()

    expect(setFailed).toHaveBeenCalledWith('request failed')
  })
})
