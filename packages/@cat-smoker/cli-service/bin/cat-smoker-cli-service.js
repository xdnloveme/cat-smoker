#!/usr/bin/env node
const Service = require('../lib/Service')
const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const command = args._[0]

const service = new Service(process.cwd());

service.run(command, args, rawArgv);