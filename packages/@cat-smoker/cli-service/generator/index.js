module.exports = (pm) => {
  console.log('我被执行了', pm);
  pm.extendPackage('我是测试的');
}