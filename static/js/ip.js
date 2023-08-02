function fetchIPDetails(ip) {
  const url = `https://ipapi.co/${ip}/json`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return {
        ip: data.ip,
        asn: data.asn,
        countryCode: data.country_code,
        city: data.city,
        org: data.org,
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
    ipElement.textContent = `IP: ${ipDetails.ip}, ASN: ${ipDetails.asn}`;

    const countryElement = document.getElementById("country");
    countryElement.textContent = `Country Code: ${ipDetails.countryCode}, City: ${ipDetails.city}, Org: ${ipDetails.org}`;
  }
}

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

getIPAddress();