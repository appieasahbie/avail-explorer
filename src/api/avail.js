import { ApiPromise, WsProvider } from '@polkadot/api';

let api;

export const connectToAvail = async () => {
  if (!api) {
    const wsProvider = new WsProvider('wss://rpc-mainnet.avail.so/ws');
    api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
  }
  return api;
};
