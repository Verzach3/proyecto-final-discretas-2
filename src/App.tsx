import { AppShell, Button, Navbar, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import React from "react";
import { useRecoilValue } from "recoil";
import { dropzoneChildren } from "./DropzoneChildren";
import Game from "./Game";
import { globalKaboom } from "./globalState";
import { parseInputFileText } from "./textParser";

function App() {
  const kInstance = useRecoilValue(globalKaboom);
  const theme = useMantineTheme()
  return (
    <AppShell
      padding={"md"}
      navbar={
        <Navbar p="md" width={{ sm: 200, lg: 300 }}>
          <Text mt={"xs"}>Log On Kaboom</Text>
          <Button my={"xs"} onClick={() => kInstance!.debug.log("Hi")}>
            Cargar Archivo
          </Button>
          <Button onClick={() => console.log("tets")}>
            Cargar Archivo
          </Button>
          <Dropzone
      onDrop={async (files) => console.log('file content\n', parseInputFileText(await files[0].text()))}
      onReject={(files) => console.log('rejected files', files)}
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
