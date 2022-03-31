const input = document.querySelector("#chatInput");
const inputBtn = document.querySelector("#sendMsg");

input.value = "/spectate";
inputBtn.click();

const settings = document.querySelector("#slotSettingsBtn");
settings.click();

const fsSlots = document.querySelector("#fsSlots");
const hqSlots = document.querySelector("#hqSlots");
const statsSlots = document.querySelector("#statsSlots");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

delay(1000)
  .then(() => {
    fsSlots.click();
    hqSlots.click();
    statsSlots.click();
    return delay(1000);
  })
  .then(() => {
    settings.click();
  });
