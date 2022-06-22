import { KaboomCtx } from "kaboom";
import { atom } from "recoil";

export const globalKaboom = atom<KaboomCtx | undefined>({
  key: "KaboomGlobal",
  default: undefined
})

export const currentInputText = atom<[number, number[][]] | undefined>({
  key: "InputText",
  default: undefined
})