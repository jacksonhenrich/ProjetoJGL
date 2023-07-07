import API from "./api.js";

const wifis = await API.read();

console.log(wifis);


function loadwifisView(wifis) {
  for (const wifi of wifis) {
    createWifiView(wifi);
  }
}

function createWifiView(wifi) {
  const tbody = document.querySelector("tbody");

  const rowView = `<tr ssid="wifi-${wifi.ssid}">
      <td>${wifi.ssid}</td>
      <td>${wifi.signalLevel}</td>
      <td>${wifi.channel}</td>
      <td>${wifi.frequency}</td>
      <td>${wifi.quality}</td>
      <td>${wifi.security}</td>
    </tr>`;

  tbody.insertAdjacentHTML("beforeend", rowView);

  const rowTag = document.querySelector(`tr#wifi-${wifi.ssid}`);
}

loadwifisView(wifis);
