import { KaboomCtx } from "kaboom";
import { atom } from "recoil";
import { GraphNode } from "../Classes/GraphNode";

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
