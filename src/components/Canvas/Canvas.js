import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const { draw, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    // canvas.addEventListener("touchstart", (e) => {
    //     e.preventDefault();
    //    // this.props.updateMousePos(e.clientX, e.clientY);
    //    // this.props.startDrawing();
    // });

    // canvas.addEventListener("touchmove", (e) => {
    //     e.preventDefault();

    //     // updateMousePos(e.touches[0].pageX, e.touches[0].pageY)
    // });

    // canvas.addEventListener("touchend", (e) => {
    //     e.preventDefault();
    //     // resetClicked();
    //  });    



    const context = canvas.getContext('2d')
    
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas