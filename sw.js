function renderLog() {
    let log = JSON.parse(localStorage.getItem('timeLog') || '[]');
    const ul = document.getElementById('log');
    ul.innerHTML = '';

    log.forEach(entry => {
        const li = document.createElement('li');

        let start = new Date(entry.start);
        let end = new Date(entry.end);
        let dateStr = start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        let startStr = start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        let endStr = end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        let ratingStr = entry.rating ? `⭐${entry.rating}` : '';

        li.textContent = `${dateStr}  ${startStr} – ${endStr}  ${entry.task || ''}  ${ratingStr}`;
        ul.appendChild(li);
    });
}
