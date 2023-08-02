 // JavaScript
function fetchIPDetails(ip) {
  const url = `http://ip-api.com/json/${ip}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return {
        ip: data.query,
        isp: data.as,
        countryCode: data.countryCode,
        city: data.city,
      };
    })
    .catch((error) => {
      console.error("Error fetching IP details:", error);
      return null;
    });
}

function updateDetailsOnPage(ipDetails) {
  if (ipDetails) {
    const ipElement = document.getElementById("ip");
    ipElement.textContent = `IP: ${ipDetails.ip}, ISP: ${ipDetails.isp}`;

    const countryElement = document.getElementById("country");
    countryElement.textContent = `Country Code: ${ipDetails.countryCode}, City: ${ipDetails.city}`;
  }
}

// Функция для получения IP пользователя
function getIPAddress() {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const userIP = data.ip;
      fetchIPDetails(userIP).then((ipDetails) => {
        updateDetailsOnPage(ipDetails);
      });
    })
    .catch((error) => {
      console.error("Error fetching IP:", error);
    });
}

// Вызываем функцию для получения IP и данных по IP
getIPAddress();