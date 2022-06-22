import { Button, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { globalKaboom } from "./globalState";

function Game() {
  const [kInstance, setKInstance] = useRecoilState(globalKaboom);
  const canvas = useRef(null);
  console.log(canvas);
  useEffect(() => {
    if (canvas.current === null) {
    }
    console.log("null");

    if (canvas.current !== null) {
      console.log("not null");
      setKInstance(
        kaboom({
          global: false,
          canvas: canvas.current,
          width: 800,
          height: 600,
        })
      );
    }
  }, [canvas]);

  return (
    <div>
      <Center>
        <canvas ref={canvas} />
      </Center>
    </div>
  );
}

export default Game;
