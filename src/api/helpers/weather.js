import got from 'got';
import config from 'config'

export async function getWeather() {
  //note that config is picked up based on the following env variable:
  //NODE_ENV=production
  //or if not present, default will be used
  const url = config.get('apis.weather.url')
  const data = await got(url).json();
  return data.hourly.temperature_2m[0]
}

export async function weatherifyItem(item) {
  let weatheredItem = item
  if (item.toLowerCase().includes("walk")) {
    const temperature = await getWeather()
    weatheredItem = weatheredItem + ` (Current temperature: ${temperature})`
  }

  return weatheredItem
}
