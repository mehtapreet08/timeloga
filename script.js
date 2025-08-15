function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function formatTime(date) {
  return date.toTimeString().split(' ')[0];
}

function getLogs() {
  return JSON.parse(localStorage.getItem('logs') || '[]');
}

function saveLogs(logs) {
  localStorage.setItem('logs', JSON.stringify(logs));
}

function renderLogs() {
  const logs = getLogs();
  const tbody = document.querySelector('#logTable tbody');
  tbody.innerHTML = '';
  logs.forEach((log, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.date}</td>
      <td>${log.startTime}</td>
      <td>${log.endTime || ''}</td>
      <td>${log.task || ''}</td>
      <td>${log.rating || ''}</td>
      <td>
        <button onclick="copyLog(${idx})">Copy</button>
        <button onclick="deleteLog(${idx})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function ensureContinuousSession() {
  const logs = getLogs();
  const now = new Date();

  if (logs.length === 0) {
    logs.push({
      date: formatDate(now),
      startTime: formatTime(now),
      endTime: "",
      task: "",
      rating: 0
    });
  } else {
    const last = logs[logs.length - 1];
    if (last.endTime) {
      logs.push({
        date: formatDate(now),
        startTime: formatTime(now),
        endTime: "",
        task: "",
        rating: 0
      });
    }
  }

  saveLogs(logs);
}

document.getElementById('startBtn').addEventListener('click', () => {
  const logs = getLogs();
  const now = new Date();
  logs.push({
    date: formatDate(now),
    startTime: formatTime(now),
    endTime: "",
    task: "",
    rating: 0
  });
  saveLogs(logs);
  renderLogs();
});

document.getElementById('endBtn').addEventListener('click', () => {
  const logs = getLogs();
  if (logs.length === 0) return;

  const now = new Date();
  logs[logs.length - 1].endTime = formatTime(now);

  // Immediately start a new session after ending
  logs.push({
    date: formatDate(now),
    startTime: formatTime(now),
    endTime: "",
    task: "",
    rating: 0
  });

  saveLogs(logs);
  renderLogs();
});

function copyLog(index) {
  const logs = getLogs();
  const log = logs[index];
  if (!log.task || !log.rating) {
    alert("Please fill Task and Rating before copying.");
    return;
  }
  const text = `${log.date} | ${log.startTime} - ${log.endTime} | ${log.task} | Rating: ${log.rating}`;
  navigator.clipboard.writeText(text);
}

function deleteLog(index) {
  const logs = getLogs();
  logs.splice(index, 1);
  saveLogs(logs);
  renderLogs();
}

document.addEventListener("DOMContentLoaded", function () {
  ensureContinuousSession();
  renderLogs();
});
