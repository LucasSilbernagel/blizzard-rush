export const isBrowser = typeof window !== 'undefined'

const getEnv = () => {
  return isBrowser ? window.ENV : process.env
}

export default getEnv
