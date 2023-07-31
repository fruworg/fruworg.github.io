// Получаем информацию о браузере и операционной системе пользователя
const userAgent = navigator.userAgent;
const browser = getBrowser(userAgent);
const os = getOperatingSystem(userAgent);

// Функция для определения браузера
function getBrowser(userAgent) {
  const browsers = {
    Chrome: /Chrome\/([0-9]+)/,
    Firefox: /Firefox\/([0-9]+)/,
    Edge: /Edg\/([0-9]+)/,
    IE: /Trident\/.+rv:([0-9]+)/,
    Safari: /Safari\/([0-9]+)/,
    Opera: /Opera\/([0-9]+)/,
  };

  for (const browser in browsers) {
    if (browsers[browser].test(userAgent)) {
      const version = userAgent.match(browsers[browser])[1];
      return `${browser} ${version}`;
    }
  }

  return 'Unknown Browser';
}

// Функция для определения операционной системы
function getOperatingSystem(userAgent) {
  const operatingSystems = {
    'Windows 10': /Windows NT 10/,
    'Windows 8.1': /Windows NT 6.3/,
    'Windows 8': /Windows NT 6.2/,
    'Windows 7': /Windows NT 6.1/,
    'Windows Vista': /Windows NT 6.0/,
    'Windows XP': /Windows NT 5.1/,
    'Windows 2000': /Windows NT 5.0/,
    'Mac OS': /Mac OS X/,
    'Linux': /Linux/,
    'iOS': /(iPhone|iPad|iPod)/,
    'Android': /Android/,
  };

  for (const os in operatingSystems) {
    if (operatingSystems[os].test(userAgent)) {
      return os;
    }
  }

  return 'Unknown OS';
}

// Полученные значения записываем в элемент с id="user-agentt"
const uaInfoElement = document.getElementById("user-agent");
uaInfoElement.textContent = `${browser}, ${os}`;