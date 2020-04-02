module.exports = class Service {
  constructor (context) {
    this.context = context;
  }

  run (command) {
    if (['serve', 'build', 'test'].includes(command)) {
      const scriptPath = `./script/${command}`;
      require(scriptPath)()
        .then(() => {})
        .catch(e => {
          console.log('启动服务器错误，原因如下:', e);
        });
    } else {
      console.log('未知的命令(script) "' + command + '".');
      console.log('也许你需要看看文档');
      console.log('See: https://github.com/xdnloveme/cat-smoker.');
    }
  }
};
