# get-ip-action

A GitHub Action that fetches the caller's IP address from an IP lambda endpoint.

## Inputs

| Name           | Required | Description                    |
| -------------- | -------- | ------------------------------ |
| `api_key`      | Yes      | API key for the IP lambda      |
| `endpoint_url` | Yes      | IP lambda endpoint URL         |

## Outputs

| Name | Description        |
| ---- | ------------------- |
| `ip` | The caller's IP address |

## Usage

```yaml
- uses: yamut/get-ip-action@v1
  id: get-ip
  with:
    api_key: ${{ secrets.IP_LAMBDA_API_KEY }}
    endpoint_url: https://example.com/ip

- run: echo "IP is ${{ steps.get-ip.outputs.ip }}"
```

## Development

```bash
npm install
npm run build && npm run package
npm test
```

`dist/index.js` is the compiled, bundled entry point that GitHub Actions actually runs — after changing `src/`, run `npm run package` and commit the updated `dist/`. CI (`check-dist.yml`) verifies `dist/` is in sync with `src/` on every push and pull request.
