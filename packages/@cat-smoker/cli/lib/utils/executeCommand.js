const { execa } = require('@cat-smoker/cli-shared-utils')
const EventEmitter = require('events')

const debug = require('debug')('cat-smoker-cli:execute')

class InstallProgress extends EventEmitter {
  constructor () {
    super()

    this._progress = -1
  }

  get progress () {
    return this._progress
  }

  set progress (value) {
    this._progress = value
    this.emit('progress', value)
  }

  get enabled () {
    return this._progress !== -1
  }

  set enabled (value) {
    this.progress = value ? 0 : -1
  }

  log (value) {
    this.emit('log', value)
  }
}
const progress = exports.progress = new InstallProgress()
exports.executeCommand = function executeCommand (command, args, cwd) {
  debug(`command: `, command)
  debug(`args: `, args)

  return new Promise((resolve, reject) => {

    progress.enabled = false

    const child = execa(command, args, {
      cwd,
      stdio: ['inherit', 'inherit', 'inherit']
    })

    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
        return
      }
      resolve()
    })
  })
}
