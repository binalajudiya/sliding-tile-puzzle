// Get a big picture of the current game
export const getGameImgFile = (url: string) => {
  return new URL(`../assets/images/${url}/${url}.jpg`, import.meta.url).href
}

// Get the current game small picture
export const getSmallImg = (path: string) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

export interface IMode {
  gameImg: string
  level: number
}
