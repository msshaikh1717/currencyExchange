const input = document.querySelector(".input input");
const selectFrom = document.querySelector(".subSelectFrom select");
const selectTo = document.querySelector(".subSelectTo select");
const fromOpt = selectFrom.options;
const select = document.querySelectorAll(".selector select");
const btn = document.querySelector("#btn");
const baseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const msg = document.querySelector("#msg");

window.addEventListener("load", () => {
  updExchRate();
});

const flagUpdate = (element) => {
  let updCurr = element.value;
  let updCode = countryList[updCurr];
  let UpdFlag = `https://flagsapi.com/${updCode}/flat/64.png`;
  let flagImg = element.parentElement.querySelector("img");
  flagImg.src = UpdFlag;
};

for (let selection of select) {
  for (let curr in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = curr;

    if (selection.name === "from" && curr === "USD") {
      newOpt.selected = "selected";
    } else if (selection.name === "to" && curr === "INR") {
      newOpt.selected = "selected";
    }

    selection.append(newOpt);
  }
  selection.addEventListener("change", (ev) => {
    flagUpdate(ev.target);
  });
}

const updExchRate = async () => {
  if (input.value < 1 || input.value == "") {
    input.value = 1;
  }

  let fromCurr = selectFrom.value;
  const newUrl = `${baseUrl}/${fromCurr.toLowerCase()}.json`;
  let response = await fetch(newUrl);
  let data = await response.json();
  let rate = data[fromCurr.toLowerCase()];

  for (let country in rate) {
    let toCurr = selectTo.value;
    if (country === toCurr.toLowerCase()) {
      let finalAmount = input.value * rate[country];

      msg.innerText = `${input.value} ${fromCurr} = ${finalAmount.toFixed(
        4
      )} ${toCurr}`;
    }
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updExchRate();
});
