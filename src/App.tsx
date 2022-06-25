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
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
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
import { GameObj, PosComp, SpriteComp } from "kaboom";
import { bfsOnGraph } from "./Util/bfs";

function App() {
  const K = useRecoilValue(globalKaboom);
  const [inputText, setInputText] = useRecoilState(currentInputText);
  const level = useRecoilValue(currentLevel);
  const [graph, setGraph] = useRecoilState(currentGraph);
  const theme = useMantineTheme();
  const [selectedAlgo, setSelectedAlgo] = useState<"DFS" | "BFS">("DFS");
  const [results, setResults] = useState<string[]>([]);
  const [playerPos, setPlayerPos] = useState([0, 0]);
  const [player, setPlayer] = useState<
    GameObj<SpriteComp | PosComp> | undefined
  >(undefined);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const posToVec2 = (pos: [number, number]) => K!.vec2(pos[0], pos[1]);
  useEffect(() => {
    if (!level || !K) return;
    const newPos = results![0]!.split("-").map(Number);
    setPlayer(
      K!.add([K!.sprite("player"), K!.pos(level.getPos(newPos[1], newPos[0]))])
    );
  }, [level]);

  useEffect(() => {
    console.log("results", results);
  }, [results]);
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar p="md" width={{ sm: 200, lg: 300 }}>
          <Text my={"xs"}>Log On Kaboom</Text>
          <Button onClick={() => K!.debug.log("Hi")}>Cargar Archivo</Button>
          <Button my={"xs"} onClick={() => K!.destroyAll("structure")}>
            Destroy All
          </Button>
          <Button
            onClick={() => {
              setInputText(parseInputFileText(documentExample));

              const loadedGraph = graphFromInput(
                parseInputFileText(documentExample)
              );
              if (loadedGraph !== undefined) {
                setGraph(loadedGraph);
                if (selectedAlgo === "DFS") {
                  const [threekilosResult, threekilosEndGraph] = dfsOnGraph(
                    loadedGraph,
                    "3kilos"
                  );
                  const [twokilosResult, twokilosEndGraph] = dfsOnGraph(
                    threekilosEndGraph!,
                    "2kilos"
                  );
                  const [recicleResult, recicleEndGraph, recicleEndPath] =
                    dfsOnGraph(twokilosEndGraph!, "recicle");
                  setResults([...threekilosResult, ...twokilosResult, ...recicleResult]);
                  console.log(recicleEndGraph);
                }
                if (selectedAlgo === "BFS") {
                  console.log("BFS");
                  const [threekilosResult, threekilosEndGraph, threeKilosPath] = bfsOnGraph(
                    loadedGraph,
                    "3kilos"
                  );
                  const [twokilosResult, twokilosEndGraph] = bfsOnGraph(
                    threekilosEndGraph!,
                    "2kilos"
                  );
                  const [recicleResult, recicleEndGraph] =
                    bfsOnGraph(twokilosEndGraph!, "recicle");
                  setResults([...threeKilosPath, ...twokilosResult, ...recicleResult]);
                  console.log(recicleEndGraph);
                }
              }
            }}
          >
            Load Document Example
          </Button>
          <Center my={"xs"}>
            <ActionIcon
              size={"lg"}
              variant="filled"
              color={"blue"}
              style={{ marginRight: 5, width: "49%" }}
              onClick={() => {
                const newPos = results[currentResultIndex]
                  .split("-")!
                  .map(Number);
                player!.moveTo(level!.getPos(newPos[1], newPos[0]));
                console.log(player!.pos, currentResultIndex);
                setCurrentResultIndex((x) => {
                  if (x === 0) return results.length - 1;
                  return x - 1;
                });
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
                player!.moveTo(level!.getPos(newPos[1], newPos[0]));
                console.log(player!.pos, currentResultIndex);
                setCurrentResultIndex((x) => {
                  if (x === results.length - 1) return 0;
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
          <Select
            my={"xs"}
            data={[
              { value: "default", label: "Default" },
              { value: "start", label: "Start Point" },
              { value: "2kilos", label: "2Kilos Bin" },
              { value: "3kilos", label: "3Kilos Bin" },
              { value: "recicle", label: "Recicle Point" },
            ]}
            value="default"
          />
          <Center>
            <ActionIcon
              size={"lg"}
              color={"blue"}
              variant="filled"
              disabled={false}
              style={{ marginRight: 5, width: "49%" }}
            >
              <Search size={14} />
            </ActionIcon>
            <ActionIcon
              size={"lg"}
              color={"blue"}
              variant="filled"
              disabled={results.length < 1 ? true : false}
              style={{ marginLeft: 5, width: "49%" }}
              onClick={() =>
                showNotification({
                  title: "Search Result",
                  message: results.join(",  "),
                })
              }
            >
              <InfoCircle size={14} />
            </ActionIcon>
          </Center>
          <Dropzone
            my={"xs"}
            style={{ alignItems: "flex-end" }}
            onDrop={async (files) => {
              const parsedInput = parseInputFileText(await files[0].text());
              setInputText(parseInputFileText(await files[0].text()));
              const loadedGraph = graphFromInput(parsedInput);
              if (loadedGraph !== undefined) {
                setGraph(loadedGraph);
                console.log(dfsOnGraph(loadedGraph, "recicle"));
              }
              console.log(
                "file content\n",
                parseInputFileText(await files[0].text())
              );
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
