import si from 'systeminformation';

export async function listWifis() {
  const wifis = await si.wifiNetworks();
  
  return wifis;
}