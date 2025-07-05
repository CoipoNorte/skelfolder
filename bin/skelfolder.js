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
  viewExtensions
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

program.parse(process.argv)
