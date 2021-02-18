#!/usr/bin/env node
import yargs from 'yargs';

import configModule from './cli/commands/config/config';
import processModule from './cli/commands/process/process';

const argv = yargs(process.argv.slice(2))
  .command(configModule)
  .command(processModule)
  .option('help', {
    alias: 'h',
  })
  .option('version', {
    alias: 'v',
  }).argv;
