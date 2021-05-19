
export const importAll = require =>
require.keys().reduce((acc, next, i) => {
  acc[i] = require(next);
  // console.log(acc)
  return acc;
}, []);


export const resizeElementToDisplaySize = (element) => {
    
    const { width, height } = element.getBoundingClientRect()

    if (element.width !== width || element.height !== height) {
      element.width = width
      element.height = height
      return true // here you can return some usefull information like delta width and delta height instead of just true
      // this information can be used in the next redraw...
    }

    return false
  }


export const getRandom = (min, max) => {
    return min + Math.random() * (max - min)
}

export const getRandomInt = (min, max) => {
    return Math.floor(min + Math.random() * (max - min))
}

export const mapVal = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export const degreesToRadians = angle => (Math.PI * angle) / 180;
export const radiansToDegrees = angle => (angle * (180/Math.PI) + 360) % 360;
export const radiansToDegrees2 = angle => (angle >= 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI)

export const range = count => Array.from(Array(count).keys());