# skelfolder

[![npm version](https://img.shields.io/npm/v/skelfolder.svg)](https://www.npmjs.com/package/skelfolder) [![license](https://img.shields.io/npm/l/skelfolder.svg)](./LICENSE)

Lee la estructura de carpetas de tu proyecto y la muestra como un árbol ASCII en consola, la guarda en un archivo Markdown o genera carpetas/archivos desde un esquema en Markdown.

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

- `skelfolder generate <archivo.md> [destino]`  
  Crea en `[destino]` (por defecto cwd) la estructura de carpetas y archivos definida en el bloque ```plaintext``` de `<archivo.md>`.

- `skelfolder af <carpeta>`  
  Añade `<carpeta>` a la lista de carpetas ignoradas.

- `skelfolder rf <carpeta>`  
  Elimina `<carpeta>` de la lista de carpetas ignoradas.

- `skelfolder vf`  
  Muestra la lista de carpetas actualmente ignoradas.

- `skelfolder ae <.ext>`  
  Añade la extensión `<.ext>` a la lista de archivos ignorados.

- `skelfolder re <.ext>`  
  Elimina la extensión `<.ext>` de la lista de archivos ignorados.

- `skelfolder ve`  
  Muestra la lista de extensiones de archivos actualmente ignoradas.

- `skelfolder aa <archivo>`  
  Añade el nombre exacto de `<archivo>` a la lista de archivos ignorados.

- `skelfolder ra <archivo>`  
  Elimina el nombre exacto de `<archivo>` de la lista de archivos ignorados.

- `skelfolder va`  
  Muestra la lista de archivos específicos actualmente ignorados.

- `skelfolder --help`  
  Muestra ayuda completa con todas las opciones y comandos disponibles.

## Configuración

Al ejecutar `af`, `rf`, `ae`, `re`, `aa` o `ra`, se crea o actualiza `skelfolder.config.json` en tu carpeta raíz con tres secciones:

```jsonc
{
  "ignoreFolders": [
    ".git",
    "node_modules",
    "build"
  ],
  "ignoreExtensions": [
    ".log",
    ".tmp"
  ],
  "ignoreFiles": [
    "package-lock.json",
    "yarn.lock"
  ]
}
```

- `ignoreFolders`: nombres de carpetas a omitir al leer o guardar.  
- `ignoreExtensions`: extensiones de archivo a omitir (incluye el punto).  
- `ignoreFiles`: nombres exactos de archivos a omitir.

## Ejemplos

```bash
# Mostrar árbol excluyendo .git y node_modules
skelfolder read

# Ignorar carpeta `build` y ver la lista de ignores
skelfolder af build
skelfolder vf

# Ignorar extensiones .log y verlas
skelfolder ae .log
skelfolder ve

# Ignorar un archivo específico y comprobarlo
skelfolder aa package-lock.json
skelfolder va

# Guardar estructura en Markdown
skelfolder save

# Generar un proyecto desde 'plantilla.md'
skelfolder generate plantilla.md ./nuevo-proyecto
```

## Publicación

*por si lo olvido :(*

1. Inicia sesión y verifica tu usuario en npm:
   ```bash
   npm login
   npm whoami
   ```
2. Incrementa la versión según SemVer:
   ```bash
   npm version patch   # → 1.0.2
   npm version minor   # → 1.1.0
   npm version major   # → 2.0.0
   ```
3. Publica en el registro público:
   ```bash
   npm publish --access public
   ```
4. Verifica la nueva versión instalada globalmente:
   ```bash
   npm install -g skelfolder
   skelfolder --version
   ```

## Licencia

MIT © CoipoNorte