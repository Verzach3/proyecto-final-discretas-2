/*
Gabriel Correa Cardenas - 202073013
Juan Camilo Varela Ocoró - 202060166
--------------------------------------------------------------------------------
*/

//Se importa libreria mantine para react, para la parte gráfica del programa
import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon, File } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';

//Se agrega y personaliza una zona de "drop" para arrastrar y soltaren sí misno archivos de texto con la configuración de nivel
function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

/*Función para la v zona de "drop" que dibuja una "X" o una flecha hacia arriba en símbolización de si el archivo es aceptado o no.
Sólo recibe archivos de texto plano*/
function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <File {...props} />;
}

//Exporta todo el componente creado para usarlo en App.tsx
export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
  </Group>
);
