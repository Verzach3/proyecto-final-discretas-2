import { Button } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import kaboom, { KaboomCtx } from 'kaboom'
import React, { useEffect, useRef, useState } from 'react'

function App() {
  const [kInstance, setKInstance] = useState<undefined | KaboomCtx>(undefined)
  const canvas = useRef(null)
  console.log(canvas)
  useEffect(() => {
    if (canvas.current === null) {
    } console.log("null");
      
    if (canvas.current !== null) {
      console.log("not null");
      setKInstance(kaboom({
        global: false,
        canvas: canvas.current,
        width: 800,
        height: 600

      }))
    }
  }, [canvas])
  
  return (
    <div>
      <Button onClick={() => kInstance!.debug.log("hi")}></Button>
      <canvas ref={canvas}/>
    </div>
  )
}

export default App