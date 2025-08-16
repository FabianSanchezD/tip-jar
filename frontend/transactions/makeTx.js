import {
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Networks,
  Memo,
} from '@stellar/stellar-sdk';
import * as Freighter from '@stellar/freighter-api';

const server = new Horizon.Server('https://horizon-testnet.stellar.org'); // we are working on testnet
const receiverPublicKey= process.env.NEXT_PUBLIC_RECEIVER_PK;

const makeTx = async (amount, memo) => {
  const checkConnection = await Freighter.isConnected();
  if (!checkConnection) {
    return "Freighter is not connected";
  }

  const isAppAllowed = await Freighter.isAllowed();

  if (!isAppAllowed.isAllowed) {
    const allowApp = await Freighter.setAllowed();
  }

  const addressFreighter = await Freighter.getAddress();

  // we do this cause not entirely sure if addressFreighter is always an object or a string
  const publicKey = addressFreighter.address ?? addressFreighter; 
  if (typeof publicKey !== 'string' || !publicKey) {
    return "Failed to get public key";
  }

  // we have to load the account from with horizon
  const account = await server.loadAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: String(await server.fetchBaseFee()),
    networkPassphrase: Networks.TESTNET,
  })
  .addOperation(Operation.payment({
      destination: receiverPublicKey,
      asset: Asset.native(),
      amount,
    }))
    .setTimeout(60)
    .addMemo(Memo.text(memo.slice(0,28)))
    .build();

  const xdr = tx.toXDR(); // we need to pass it to xdr for it to work with freighter

  const freighterSign = await Freighter.signTransaction(xdr, { networkPassphrase: Networks.TESTNET });
  if (!freighterSign) {
    return "Failed to sign transaction";
  }
  const signedTx = TransactionBuilder.fromXDR(freighterSign.signedTxXdr, Networks.TESTNET);

  try {
  const res = await server.submitTransaction(signedTx);
  return `Transaction submitted successfully: ${res.hash}`;
} catch (e) {
  const data = e?.response?.data;
  console.error("Error:", data);
  return "Failed to submit transaction";
}
}

export default makeTx;
