const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");

const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => response.json());
}

function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const alerts = data.features;

  const summary = document.createElement("h3");
  summary.textContent =
    `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;

  alertsDisplay.appendChild(summary);

  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsDisplay.appendChild(list);
}

button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase();

  alertsDisplay.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  if (state.length !== 2) {
    errorDiv.textContent = "Please enter a valid 2-letter state code.";
    errorDiv.classList.remove("hidden");
    return;
  }

  fetchWeatherAlerts(state)
    .then(data => {
      console.log(data);
      displayAlerts(data, state);
      input.value = "";
    })
    .catch(error => {
      console.log(error.message);
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
    });
});