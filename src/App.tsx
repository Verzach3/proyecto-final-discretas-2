import { AppShell, Button, Navbar, Text, useMantineTheme } from "@mantine/core";
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

function App() {
  const K = useRecoilValue(globalKaboom);
  const [inputText, setInputText] = useRecoilState(currentInputText);
  const level = useRecoilValue(currentLevel);
  const [graph, setGraph] = useRecoilState(currentGraph);
  const theme = useMantineTheme();
  const [lastsetpos, setLastsetpos] = useState([0, 0]);

  useEffect(() => {
    if (!level || !K) return;
    K!.add([
      K!.sprite("player"),
      K!.pos(level!.getPos(K!.vec2(lastsetpos[1], lastsetpos[0]))),
    ]);
  }, [level]);
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar p="md" width={{ sm: 200, lg: 300 }}>
          <Text mt={"xs"}>Log On Kaboom</Text>
          <Button my={"xs"} onClick={() => K!.debug.log("Hi")}>
            Cargar Archivo
          </Button>
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
                const dfsresult = dfsOnGraph(loadedGraph, "3kilos");
                console.log(dfsresult);
                const lastsetpos = [...dfsresult].pop()!.split("-").map(Number);
                setLastsetpos(lastsetpos);
              }
            }}
          >
            Load Document Example
          </Button>
          <Dropzone
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
