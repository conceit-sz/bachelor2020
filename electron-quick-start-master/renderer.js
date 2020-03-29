// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs')
//1. 目的：得到path。策略：操作DOM元素，实现选取文件。









//2. 目的：得到arr_ax[],里面放满的是所有十进制东向角数据。策略：单步调试。

const arr_ax = []
const arr_ay = []
const arr_az = []

let options = {
  east: {},
  north: {},
  heading: {}
}

//测试
const pathName = '../src/INS.din'

fs.readFile(pathName, function(er, buf) {
  rowStr = buf.toString('hex')
  rowStr = rowStr.replace(/dbc0/g, 'dc').replace(/dbdb/g, 'dd')
  // console.log(rowStr.length % 130)
  // console.log(rowStr.length/130)
  // console.log(rowStr.indexOf('9ff1ffff'))
  let index = rowStr.indexOf('9ff1ffff')
    const inToArr = (index) => {
      let arr_ax1 = target(index)
      // console.log(arr_ax1)
      // console.log(foo(arr_ax1[0]))
      arr_ax1.forEach(val => arr_ax.push(foo(val)) )
      console.log(arr_ax)
    }
    inToArr(index)
})

const target = index => {
  let s = []
  //110个点
  while(index < rowStr.length / 1300){
    s.push(rowStr.slice(index, index + 8))
    index += 130
  }
  return s
}

const foo = (val) => {
  function hexToInt(hex) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
  }
  function hexToInt2 (hexStr) {

    hexStr = hexStr.replace(/ /g,'')
  //   console.log(hexStr)
    var temp = []
    if((hexStr.length) % 2 === 1) {
      hexStr += ' '
    }
    for(let i = 0; i <= hexStr.length; i += 2) {
      temp += ( hexStr.substr(hexStr.length - i, 2) )
    }
  //   return temp
  //     return res = parseInt(temp, 16)
        return res = hexToInt(temp)
  }
  let result = hexToInt2(val)
  result = result / (16777216*256)
  return result
}



// //3.
// let obj = {east: arr_ax}
// let $ = s => document.querySelector(s)
// let $$ = s => document.querySelectorAll(s)

// let $exa_sel  = $('#example-select')

// $exa_sel.onchange = function() {
//   let m = this.value
//   console.log(m)
//   if(!obj[m]) {
//     obj[m] = []
//     console.log(obj)
//   }
// }