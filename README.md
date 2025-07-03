# rfs

[![npm version](https://img.shields.io/npm/v/rfs.svg)](https://www.npmjs.com/package/rfs) [![license](https://img.shields.io/npm/l/rfs.svg)](./LICENSE)

Lee la estructura de carpetas de tu proyecto y la muestra como un árbol ASCII en consola o la guarda en un archivo Markdown.

---

## Instalación

Instala **rfs** de forma global:

```bash
npm install -g rfs
```

O añádelo como dependencia de desarrollo:

```bash
npm install --save-dev rfs
```

---

## Comandos

- `rfs read [directorio]`  
  Muestra en consola la estructura de carpetas en formato ASCII.  
  Si no se especifica `[directorio]`, usa el directorio actual.

- `rfs save [directorio]`  
  Genera un archivo `STRUCTURE.md` con la misma estructura en Markdown.  
  Si no se especifica `[directorio]`, usa el directorio actual.

---

## Ejemplos

Mostrar la estructura de un proyecto:

```bash
rfs read /ruta/a/mi-proyecto
```

Guardar en `STRUCTURE.md`:

```bash
rfs save /ruta/a/mi-proyecto
```

---

## Salida de ejemplo

```plaintext
mi-proyecto
├── src
│   ├── index.js
│   └── lib
│       └── tree.js
├── package.json
└── README.md
```

En Markdown (archivo `STRUCTURE.md`):

```markdown
```plaintext
mi-proyecto
├── src
│   ├── index.js
│   └── lib
│       └── tree.js
├── package.json
└── README.md
```
```

---

## Características

- Recorrido síncrono rápido de carpetas
- Salida limpia en consola con caracteres ASCII
- Exportación automática a Markdown
- Sin dependencias pesadas, solo [`commander`](https://www.npmjs.com/package/commander)

---

## Contribuir

1. Haz un fork del repositorio.  
2. Crea una rama con tu mejora: `git checkout -b feature/nueva-opcion`.  
3. Realiza tus cambios y pruebas.  
4. Abre un pull request con descripción clara.

---

## Licencia

Este proyecto está bajo la licencia MIT.  
Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

© 2024 CoipoNorte