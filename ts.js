let teslaChart;

async function fetchTeslaData() {
    // Fetch data from the API (replace YOUR_API_KEY with your actual key)
    const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&apikey=DCHCQ4KKNYMZ6TDD');
    const data = await response.json();

    // Extract and transform the data into a format suitable for Chart.js
    const timeSeries = data['Time Series (1min)'];
    const labels = Object.keys(timeSeries);
    const prices = labels.map(time => timeSeries[time]['1. open']); 

    if (teslaChart) {
        teslaChart.data.labels = labels;
        teslaChart.data.datasets[0].data = prices;
        teslaChart.update();
    } else {
        const ctx = document.getElementById('teslaChart').getContext('2d');
        teslaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tesla Price',
                    data: prices,
                    borderColor: '#FF5733',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                minute: 'HH:mm'
                            }
                        }
                    }
                }
            }
        });
    }
}

// Fetch data every minute (60000 milliseconds)
setInterval(fetchTeslaData, 60000);
