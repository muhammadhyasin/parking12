//'https://0m3q5zuw40.execute-api.eu-north-1.amazonaws.com/invoke/dbmanager'

fetch('https://9gj71hvh90.execute-api.ap-south-1.amazonaws.com/DBoperations/getslot')
.then(res => {
  return res.json()
})
.then(json => {
  json.sort((first,second) => {
    return first.TS - second.TS
  })
  const workingHoursData = {}
  const colorPalette = [
    'rgba(255, 0, 0, 0.5)',
    'rgba(60, 179, 113, 0.5)',
    'rgba(255, 165, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(238, 130, 238, 0.5)',
    'rgba(106, 90, 205, 0.5)',
  ]
  json.forEach((item, index) => {
    if (!workingHoursData[item.id]) {
      workingHoursData[item.id] = { name: item.name, totalHours: 0, color: colorPalette[index] }
    }
    if (item.status === "Entry") {
      workingHoursData[item.id].lastEntryTimestamp = item.TS
    } 
    else if (item.status === "Exit" && workingHoursData[item.id].lastEntryTimestamp) {
      const entryTimestamp = parseInt(workingHoursData[item.id].lastEntryTimestamp, 10)
      const exitTimestamp = parseInt(item.TS, 10)
      const hoursWorked = (exitTimestamp - entryTimestamp) / (1000 * 60 * 60)
      workingHoursData[item.id].totalHours += hoursWorked
      workingHoursData[item.id].lastEntryTimestamp = null
    }
  })

  const labels = Object.keys(workingHoursData);
  const data = labels.map(id => workingHoursData[id].totalHours)
  const backgroundColors = labels.map(id => workingHoursData[id].color)

  const ctx = document.getElementById('myChart').getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(id => workingHoursData[id].name),
      datasets: [{
        label: 'Working hours',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Working hours'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
})
.catch(error => console.log(error))