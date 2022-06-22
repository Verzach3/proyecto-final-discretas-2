import { Button, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import kaboom, { KaboomCtx } from "kaboom";
import React, { useEffect, useRef, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { currentInputText, globalKaboom } from "../State/globalState";
import floordemo from "../Resources/floordemo.png";
import { loadSprites } from "../Util/loadSprites";

function Game() {
  const [kInstance, setKInstance] = useRecoilState(globalKaboom);
  const currentInput = useRecoilValue(currentInputText);
  // Convert the number grid to string grid
  let stringGrid: string[] | undefined = undefined;
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

  useEffect(() => {
    if (kInstance === null || kInstance === undefined) {
      return;
    }
    loadSprites(kInstance).then(() => {
      stringGrid = currentInput![1].map((row) =>
        row.map((cell) => cell.toString()).join("")
      );
      kInstance.debug.log("currentInput" + currentInput);
      kInstance.addLevel(stringGrid, {
        width: 32,
        height: 32,
        "0": () => [kInstance.sprite("floor")],
        "1": () => [kInstance.sprite("wall")],
        "2": () => [kInstance.sprite("2kilos")],
        "3": () => [kInstance.sprite("3kilos")],
      });

    });
  }, [currentInput]);

  return (
    <div>
      <Center>
        <canvas ref={canvas} />
      </Center>
    </div>
  );
}

export default Game;
