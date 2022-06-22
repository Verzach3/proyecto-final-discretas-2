import { KaboomCtx } from "kaboom";
import floor from "../Resources/floor.png"
import wall from "../Resources/wall.png"
import twokilos from "../Resources/2kilos.png"
import threkilos from "../Resources/3kilos.png"
import recicle from "../Resources/recicle.png"
export async function loadSprites(kaboom: KaboomCtx){
  await kaboom.loadSprite("floor", floor);
  await kaboom.loadSprite("wall", wall);
  await kaboom.loadSprite("2kilos", twokilos);
  await kaboom.loadSprite("3kilos", threkilos);
  await kaboom.loadSprite("recicle", recicle);
}