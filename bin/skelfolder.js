#!/usr/bin/env node

import { Command } from 'commander'
import {
  read,
  save,
  addFolder,
  removeFolder,
  addExtension,
  removeExtension,
  viewFolders,
  viewExtensions,
  generate,
  addFile,
  removeFile,
  viewFiles
} from '../index.js'

const program = new Command()

program
  .name('skelfolder')
  .description('Lee la estructura de carpetas y la muestra o guarda en Markdown')
  .version('1.0.0')

program
  .command('read [dir]')
  .description('Muestra el árbol de carpetas en consola')
  .action(dir => {
    read(dir || process.cwd())
  })

program
  .command('save [dir]')
  .description('Guarda el árbol de carpetas en STRUCTURE.md')
  .action(dir => {
    save(dir || process.cwd())
  })

program
  .command('af <folder>')
  .description('Añade una carpeta a la lista de carpetas ignoradas')
  .action(folder => {
    addFolder(folder)
  })

program
  .command('rf <folder>')
  .description('Elimina una carpeta de la lista de carpetas ignoradas')
  .action(folder => {
    removeFolder(folder)
  })

program
  .command('ae <ext>')
  .description('Añade una extensión de archivo a la lista de ignoradas')
  .action(ext => {
    addExtension(ext)
  })

program
  .command('re <ext>')
  .description('Elimina una extensión de archivo de la lista de ignoradas')
  .action(ext => {
    removeExtension(ext)
  })

// Comando vf: muestra carpetas ignoradas
program
  .command('vf')
  .description('Muestra la lista de carpetas ignoradas')
  .action(() => {
    viewFolders()
  })

// Comando ve: muestra extensiones ignoradas
program
  .command('ve')
  .description('Muestra la lista de extensiones ignoradas')
  .action(() => {
    viewExtensions()
  })

// Comando generate: crea estructura desde Markdown
program
  .command('generate <archivo.md> [dest]')
  .description('Genera carpetas y archivos según el árbol definido en un Markdown')
  .action((md, dest) => {
    generate(md, dest)
  })

// Comando aa: añade archivo a ignorar
program
  .command('aa <file>')
  .description('Añade un archivo (por nombre) a la lista de ignorados')
  .action(file => {
    addFile(file);
  });

// Comando ra: quita archivo de ignorar
program
  .command('ra <file>')
  .description('Elimina un archivo de la lista de ignorados')
  .action(file => {
    removeFile(file);
  });

// Comando va: ver archivos ignorados
program
  .command('va')
  .description('Muestra la lista de archivos ignorados')
  .action(() => {
    viewFiles();
  });

program.parse(process.argv)
