export const getRandomColor = () => `#${Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0")}`
    export const degreesToRadians = angle => (Math.PI * angle) / 180;
    export const radiansToDegrees = angle => (angle * (180/Math.PI) + 360) % 360;
    export const radiansToDegrees2 = angle => (angle >= 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI)
    
//    const range = count => Array.from(Array(count).keys());
    const range = count => Array.from({length: count}, (el, i) => i);
    
    export const mapVal = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    

export const createCirclePath = vertices => 
    `M${vertices.map( ({theta, r, offsetX, offsetY}) =>  [
        offsetX + (r * Math.cos(theta)),
        offsetY + (r * Math.sin(theta))
    ]).join('L')}`;

export const arcPoints = (numPoints, offsetX, offsetY, radius, length, thetaOffset) => {
        const theta = length/numPoints;
        const vertices = range(numPoints);
    
        return vertices.map( idx => ({
            theta: degreesToRadians((theta * idx) + thetaOffset),
            r: radius,
            offsetX, 
            offsetY
        }))
    }