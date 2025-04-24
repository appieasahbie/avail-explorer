import { ApiPromise, WsProvider } from '@polkadot/api';

export async function connectApi() {
  const wsProvider = new WsProvider('wss://mainnet-rpc.avail.so/ws');
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;
  return api;
}
