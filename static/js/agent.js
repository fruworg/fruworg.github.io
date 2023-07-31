const userAgent = window.navigator.userAgent;
const platform = window.navigator.platform;
document.getElementById("wb").textContent = "Браузер: " + userAgent;
document.getElementById("os").textContent = "ОС: " + platform;