import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  Modal,
  MultiSelect,
  Navbar,
  Notification,
  Select,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dropzoneChildren } from "./Components/DropzoneChildren";
import Game from "./Components/Game";
import {
  currentGraph,
  currentInputText,
  currentLevel,
  globalKaboom,
} from "./State/globalState";
import { graphFromInput } from "./Util/graphFromInput";
import { parseInputFileText } from "./Util/textParser";
import { documentExample } from "./Util/exampleInputs";
import { dfsOnGraph } from "./Util/dfs";
import {
  Adjustments,
  AdjustmentsOff,
  ArrowBigLeft,
  ArrowBigRight,
  InfoCircle,
  Search,
} from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { GameObj, PosComp, SpriteComp, Vec2 } from "kaboom";
import { bfsOnGraph } from "./Util/bfs";
import { GraphNode } from "c:/Users/Verzach3/Proyectos/proyecto-final-discretas-2/src/Classes/GraphNode";

function App() {
  const K = useRecoilValue(globalKaboom);
  const [inputText, setInputText] = useRecoilState(currentInputText);
  const level = useRecoilValue(currentLevel);
  const [graph, setGraph] = useRecoilState(currentGraph);
  const theme = useMantineTheme();
  const [selectedAlgo, setSelectedAlgo] = useState<"DFS" | "BFS">("DFS");
  const [results, setResults] = useState<string[]>([""]);
  const [playerPos, setPlayerPos] = useState<Vec2 | undefined>(undefined);
  const [player, setPlayer] = useState<
    GameObj<SpriteComp | PosComp> | undefined
  >(undefined);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  useEffect(() => {
    if (!level || !K) return;
    if(results === undefined) return;
    const newPos = results![0]!.split("-")!.map(Number);
    const newPlayer = K!.add([K!.sprite("player"), K!.pos(level.getPos(newPos[1], newPos[0])), K!.area(), K!.z(1000), "structure"]);
    // newPlayer.onCollide("2kg", () => {
    //   K!.add([
    //     K!.sprite("floor"),
    //     K!.pos(newPlayer.pos)
    //   ])
    //   K!.destroyAll("2kg")
    // })
    setPlayer(
      newPlayer
    );
  }, [level]);

  useEffect(() => {
    console.log("results", results);
  }, [results]);

  useEffect(() => {
    console.log("pp",playerPos);
    if(player === undefined) return;
    console.log("pp2",player!.pos!);
    player.moveTo(playerPos!);
  }
  , [playerPos]);
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar p="md" width={{ sm: 200, lg: 300 }}>
          <Button my={"xs"} onClick={() => K!.debug.log("Hi")}>Cargar Archivo</Button>
          <Button
            
            onClick={() => {
              setInputText(parseInputFileText(documentExample));

              const loadedGraph = graphFromInput(
                parseInputFileText(documentExample)
              );
              fileAux(loadedGraph, setGraph, selectedAlgo, setResults);
              setCurrentResultIndex(0)
            }}
          >
            Cargar Ejemplo
          </Button>
          <Center my={"xs"}>
            <ActionIcon
              size={"lg"}
              variant="filled"
              color={"blue"}
              style={{ marginRight: 5, width: "49%" }}
              onClick={() => {
                setCurrentResultIndex((x) => {
                  if (x === 0) return results.length - 1;
                  return x - 1;
                });
                const newPos = results[currentResultIndex]
                  .split("-")!
                  .map(Number);
                // make the player move to the next result step by step
                setPlayerPos(level!.getPos(newPos[1], newPos[0]));
                console.log(player!.pos, currentResultIndex);
              }}
            >
              <ArrowBigLeft />
            </ActionIcon>
            <ActionIcon
              size={"lg"}
              variant="filled"
              color={"blue"}
              style={{ marginLeft: 5, width: "49%" }}
              onClick={() => {
                const newPos = results[currentResultIndex]
                  .split("-")!
                  .map(Number);
                setPlayerPos(level!.getPos(newPos[1], newPos[0]));
                console.log(player!.pos, currentResultIndex);
                setCurrentResultIndex((x) => {
                  if (x === results.length - 1) return x;
                  return x + 1;
                });
              }}
            >
              <ArrowBigRight />
            </ActionIcon>
          </Center>
          <Center>
            <Button
              disabled={selectedAlgo === "BFS" ? true : false}
              style={{ marginRight: 5, width: "49%" }}
              leftIcon={
                selectedAlgo === "BFS" ? (
                  <AdjustmentsOff size={14} />
                ) : (
                  <Adjustments size={14} />
                )
              }
              onClick={() => setSelectedAlgo("BFS")}
            >
              BFS
            </Button>
            <Button
              disabled={selectedAlgo === "DFS" ? true : false}
              style={{ marginLeft: 5, width: "49%" }}
              leftIcon={
                selectedAlgo === "DFS" ? (
                  <AdjustmentsOff size={14} />
                ) : (
                  <Adjustments size={14} />
                )
              }
              onClick={() => setSelectedAlgo("DFS")}
            >
              DFS
            </Button>
          </Center> 
          <Dropzone
            my={"xs"}
            style={{ alignItems: "flex-end" }}
            onDrop={async (files) => {
              const parsedInput = parseInputFileText(await files[0].text());
              setInputText(parseInputFileText(await files[0].text()));
              const loadedGraph = graphFromInput(parsedInput);
              if (loadedGraph === undefined) return
              fileAux(loadedGraph, setGraph, selectedAlgo, setResults);
              setCurrentResultIndex(0)
            }}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={["text/plain"]}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
        </Navbar>
      }
    >
      <Game />
    </AppShell>
  );
}

export default App;
function fileAux(loadedGraph: import("c:/Users/Verzach3/Proyectos/proyecto-final-discretas-2/src/Classes/GraphNode").GraphNode | undefined, setGraph: { (valOrUpdater: GraphNode | ((currVal: GraphNode | undefined) => GraphNode | undefined) | undefined): void; (valOrUpdater: GraphNode | ((currVal: GraphNode | undefined) => GraphNode | undefined) | undefined): void; (arg0: GraphNode): void; }, selectedAlgo: string, setResults: React.Dispatch<React.SetStateAction<string[]>>) {
  if (loadedGraph !== undefined) {
    setGraph(loadedGraph);
    if (selectedAlgo === "DFS") {
      const [threekilosResult, threekilosEndGraph, p1] = dfsOnGraph(
        loadedGraph,
        "3kilos"
      );
      const [twokilosResult, twokilosEndGraph, p2] = dfsOnGraph(
        threekilosEndGraph!,
        "2kilos"
      );
      const [recicleResult, recicleEndGraph, p3] = dfsOnGraph(twokilosEndGraph!, "recicle");
      setResults([...threekilosResult, ...twokilosResult, ...recicleResult]);
      console.log(recicleEndGraph);
    }
    if (selectedAlgo === "BFS") {
      console.log("BFS");
      const [threekilosResult, threekilosEndGraph, p1] = bfsOnGraph(
        loadedGraph,
        "3kilos"
      );
      const [twokilosResult, twokilosEndGraph, p2] = bfsOnGraph(
        threekilosEndGraph!,
        "2kilos"
      );
      const [recicleResult, recicleEndGraph, p3] = bfsOnGraph(twokilosEndGraph!, "recicle");
      setResults([...p1, ...p2, ...p3]);
      console.log(recicleEndGraph);
    }
  }
}

