/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

/*Se importan componentes de las librerias mantine, recoil y kaboom 
Kaboom: es usado para la representación gráfica del funcionamiento del programa
Recoil: es usado para manejar los estados de algunas variables en todo el programa*/
import { Button, Center } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import kaboom from "kaboom";
import React, { useEffect, useRef} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentInputText, currentLevel, globalKaboom } from "../State/globalState";
import { loadSprites } from "../Util/loadSprites";

/*Se defina la función "Game" encargada de crear el canvas para kaboom sobre el que se dibujarán los recursos 
usados para la representación gráfica*/
function Game() {
  const [K, setKInstance] = useRecoilState(globalKaboom);
  const currentInput = useRecoilValue(currentInputText);
  const [level, setLevel] = useRecoilState(currentLevel);

  // Convierte la cuadrícula de números en cuadrícula de Strings
  let stringGrid: string[] | undefined = undefined;
  const canvas = useRef(null);
  console.log(canvas);

  //Ejecuta una función cuando cambia una de las dependencias
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

          // background: [255, 255, 255],
        })
      );
    }

  }, [canvas]);

  useEffect(() => {
    if (K === null || K === undefined) {
      return;
    }
    loadSprites(K).then(() => {
      stringGrid = currentInput![1]!.map((row) =>
        row.map((cell) => cell.toString()).join("")
      );
      K.destroyAll("structure");
      const currentLevel = K.addLevel(stringGrid, {
        width: 32,
        height: 32,
        "0": () => [K.sprite("floor"), "structure"],
        "1": () => [K.sprite("wall"), "structure"],
        "2": () => [K.sprite("2kilos"), "structure"],
        "3": () => [K.sprite("3kilos"), "structure"],
        "4": () => [K.sprite("start"), "structure", "startpoint"],
        "5": () => [K.sprite("recicle"), "structure", "endpoint"],
      });
      setLevel(currentLevel);
      K.onKeyPress("x", () => {
        K.camScale(K.vec2(K.camScale().x * 1.1, K.camScale().y * 1.1)); 
      });
      K.onKeyPress("z", () => {
        K.camScale(K.vec2(K.camScale().x * 0.9, K.camScale().y * 0.9));
      }
      );

      K.debug.log(currentLevel.getPos(0,5).toString())

      K.onMouseMove((pos) => {
        if(K.isMouseDown()){

          K.debug.log(K.camPos().toString())
          K.camPos(K.vec2(pos.x/3 , pos.y/2));
        }
      })
      
      // K.add([
      //   K.sprite("player"),
      //   K.pos(currentLevel.getPos(0,4)),
      //   "player"
      // ])

    });
  }, [currentInput]);

  return (
      <Center >
        <canvas style={{height: "90vh", width: "80vw"}} ref={canvas} />
      </Center>
  );
}

export default Game;
