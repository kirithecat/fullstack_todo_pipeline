import config from 'config'

export async function getEnvironment() {
  //note that config is picked up based on the following env variable:
  //NODE_ENV=production
  //or if not present, default.json will be used
  const url = config.get('apis.environment.url')
  return url
}

