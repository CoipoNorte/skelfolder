# skelfolder

[![npm version](https://img.shields.io/npm/v/skelfolder.svg)](https://www.npmjs.com/package/skelfolder) [![license](https://img.shields.io/npm/l/skelfolder.svg)](./LICENSE)

Lee la estructura de carpetas de tu proyecto y la muestra como un árbol ASCII en consola o la guarda en un archivo Markdown.

## Instalación

Instala globalmente:

```bash
npm install -g skelfolder
```

O como devDependency:

```bash
npm install --save-dev skelfolder
```

## Comandos

- `skelfolder read [directorio]`  
  Muestra en consola el árbol ASCII. Por defecto usa el directorio actual.

- `skelfolder save [directorio]`  
  Genera `STRUCTURE.md` con el árbol en Markdown. Por defecto usa el directorio actual.

- `skelfolder af <carpeta>`  
  Añade `<carpeta>` a la lista de carpetas ignoradas.

- `skelfolder rf <carpeta>`  
  Elimina `<carpeta>` de la lista de carpetas ignoradas.

- `skelfolder ae <ext>`  
  Añade una extensión (`.ext`) a la lista de archivos ignorados.

- `skelfolder re <ext>`  
  Elimina una extensión (`.ext`) de la lista de archivos ignorados.

## Configuración

Al ejecutar `af`, `rf`, `ae` o `re`, se crea o actualiza `skelfolder.config.json` en tu carpeta raíz. Ejemplo:

```jsonc
{
  "ignoreFolders": [".git", "node_modules", "build"],
  "ignoreExtensions": [".log", ".tmp"]
}
```

## Ejemplos

```bash
# Mostrar árbol excluyendo .git y node_modules
skelfolder read

# Ignorar carpeta build
skelfolder af build

# Ignorar archivos .log
skelfolder ae .log

# Guardar estructura en Markdown
skelfolder save
```

## Publicación

1. `npm login`  
2. `npm publish --access public`

## Licencia

MIT © CoipoNorte
