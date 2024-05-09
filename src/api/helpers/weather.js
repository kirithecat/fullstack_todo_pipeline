import got from 'got';

export async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=40.90&longitude=174.88&hourly=temperature_2m&forecast_days=1"
  const data = await got(url).json();
  return data.hourly.temperature_2m[0]
}

export async function weatherifyItem(item){
  let weatheredItem = item
  if(item.toLowerCase().includes("walk")) {
    const temperature = await getWeather()
    weatheredItem = weatheredItem + ` (Current temperature: ${temperature})`
  }

  return weatheredItem
}
