const app = document.getElementById("app");
const periods = document.getElementById("periods");
const cards = app.querySelectorAll(".card");

async function getData(file = "/data.json") {
  const response = await fetch(file);
  const data = await response.json();
  return data;
}

function setButtonActive(button) {
  button.classList.add("periods__button_active");
}

function setButtonNotActive(button) {
  button.classList.remove("periods__button_active");
}

function renderContent(stats, period = "Weekly") {
  for (const card of cards) {
    const current = card.querySelector(".content__result");
    const previous = card.querySelector(".content__last-period");
    const data = stats.find((obj) => obj.title === card.id);
    current.innerText = data.timeframes[period].current + "hrs";
    previous.innerText =
      "Last Week - " + " " + data.timeframes[period].previous + "hrs";
  }
}

window.addEventListener("load", async () => {
  const usersStats = await getData();
  renderContent(usersStats, "weekly");
});

periods.addEventListener("click", async (event) => {
  const target = event.target;
  if (
    target.innerText === "Daily" ||
    target.innerText === "Weekly" ||
    target.innerText === "Monthly"
  ) {
    const usersStats = await getData();
    previousActiveButton = periods.querySelector(".periods__button_active");
    setButtonNotActive(previousActiveButton);
    setButtonActive(target);

    const period = target.innerText.toLowerCase();
    renderContent(usersStats, period);
  }
});
