// Функция для форматирования числа (добавляет ведущий ноль, если число меньше 10)
function formatNumber(num) {
  return num < 10 ? '0' + num : num;
}

// Функция для получения текущего времени и дgkgаты в поясе UTC+6
function getCurrentDateTimeUTCPlus6() {
  const currentTime = new Date();
  const offset = currentTime.getTimezoneOffset(); // Получаем разницу в минутах между UTC и локальным временем
  const utcPlus6DateTime = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000); // Добавляем 6 часов к UTC+0
  return utcPlus6DateTime;
}

// Функция для обновления времени и даты на странице
function updateClock() {
  const timeElement = document.getElementById('time');
  if (timeElement) {
    const currentDateTime = getCurrentDateTimeUTCPlus6();
    const date = formatNumber(currentDateTime.getUTCDate());
    const month = formatNumber(currentDateTime.getUTCMonth() + 1);
    const year = currentDateTime.getUTCFullYear().toString().slice(-2); // Получаем последние две цифры года
    const hours = formatNumber(currentDateTime.getUTCHours());
    const minutes = formatNumber(currentDateTime.getUTCMinutes());
    const seconds = formatNumber(currentDateTime.getUTCSeconds());

    const dateTimeString = `${date}.${month}.${year} ${hours}:${minutes}:${seconds} UTC+6`;
    timeElement.innerText = dateTimeString;
  }
}

// Обновляем время и дату каждую секунду
setInterval(updateClock, 1000);

// Вызываем функцию для первоначального обновления времени и даты
updateClock();