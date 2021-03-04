#!/usr/bin/env node
import yargs from 'yargs';

import configModule from './cli/commands/config/config';
import processModule from './cli/commands/process/process';
import listModule from './cli/commands/list/list';

const argv = yargs(process.argv.slice(2))
  .command(configModule)
  .command(processModule)
  .command(listModule)
  .option('help', {
    alias: 'h',
  })
  .option('version', {
    alias: 'v',
  }).argv;
