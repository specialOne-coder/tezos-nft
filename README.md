# EuroTz - Front End

This repo is eurotz frontend, build with vite js, React TS

## Getting started

To make it easy for you to get started with this repo, here's a list of recommended next steps.

### Requirements

- npm
- node

### Test

Create `.env` file and add theses informations : 

```code
VITE_RPC=https://rpc.tzkt.io/ghostnet
VITE_MAGIC= PUT_MAGICLINK_PK_LIVE_KEY_HERE
VITE_API_URL=http://localhost:4490
VITE_APP_BANK_ID=gh.29.fr
VITE_APP_ACCOUNT_ID=1198e2e5-856e-463e-920b-aa54ce25f607
VITE_TOKEN_CONTRACT= PUT_TOKEN_CONTRACT_HERE
VITE_PERMIT_CONTRACT= PUT_PERMIT_CONTRACT_HERE
VITE_BOND_CONTRACT_ADDRESS= PUT_BOND_CONTRACT_HERE
VITE_DVP_CONTRACT_ADDRESS= PUT_DVP_CONTRACT_HERE
VITE_TZKT_API_URL=https://api.ghostnet.tzkt.io/v1/
```

Be sure to replace all values starting with `PUT` in .env file with your own values.

After .env creation, install dependencies and start backend server with : 

```
cd eurotz-front-end
npm install
npm run dev
```
