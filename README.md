# Tip Jar (Stellar + Next.js)

Tiny test app to send XLM tips using Freighter.
Client-only MVP: one page, build -> sign -> submit.

## ⚙️ Tech Stack

- Next.js 15 + TypeScript

- @stellar/stellar-sdk

- @stellar/freighter-api

- Tailwind CSS

## Prerequisites

- Node 18+

- Freighter wallet extension installed

- Freighter network: Testnet

## 🚀 Quick start
```
git clone https://github.com/FabianSanchezD/tip-jar
cd tip-jar
npm i
cp .env.example .env
```
Change in .env to your name and public key. Then (for development):
```
npm run dev
```
Open http://localhost:3000/, connect Freighter, enter amount & memo, send.

### 🤖 Friendbot (fund your sender on Testnet)

In Freighter, copy your public key.

Hit https://friendbot.stellar.org/?addr=YOUR_G_ADDRESS

## 📄 Notes

Created by Fabian Sanchez for testing purposes on testnet.