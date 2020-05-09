const foo = require("./foo").foo

function doSomething(pathName) {
  console.log("start..")
  console.log(pathName)
  foo()
}
module.exports.doSomething = doSomething
