#!/usr/bin/env node
import { Command } from 'commander';
import { read, save } from '../index.js';

const program = new Command();

program
  .name('rfs')
  .description('Lee la estructura de carpetas y la muestra o guarda en Markdown')
  .version('1.0.0');

program
  .command('read [dir]')
  .description('Muestra el árbol de carpetas en consola')
  .action((dir) => {
    read(dir || process.cwd());
  });

program
  .command('save [dir]')
  .description('Guarda el árbol de carpetas en STRUCTURE.md')
  .action((dir) => {
    save(dir || process.cwd());
  });

program.parse(process.argv);
