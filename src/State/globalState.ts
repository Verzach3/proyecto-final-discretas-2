/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

//Se importan librerias kaboom y recoil
import { KaboomCtx, Level } from "kaboom";
import { atom } from "recoil";
import { GraphNode } from "../Classes/GraphNode";

/*Se crean atomos de recoil que guardan una "variable goblal", con el fin de que siempre se tenga un mismo estado 
goblal que irá cambiando durante todo el proceso del programa*/
export const globalKaboom = atom<KaboomCtx | undefined>({
  key: "KaboomGlobal",
  default: undefined,
});

export const currentInputText = atom<[number, number[][]] | undefined>({
  key: "InputText",
  default: undefined,
});

export const currentGraph = atom<GraphNode | undefined>({
  key: "CurrentGraph",
  default: undefined,
});

export const currentLevel = atom<Level | undefined>({
  key: "CurrentLevel",
  default: undefined,
});
