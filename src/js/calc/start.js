const funct1 = require("./foo").foo
const funct2 = require("./target").target
const fs = require("fs")

function doSomething(pathName) {
  console.log("CoreCalc getting options..")
  console.log(pathName)
  let options = {
    east: [],
    north: [],
    heading: [],
    timetable: [],
    pulse: [],
    v_east: [],
    v_north: [],
    v_heading: [],
    dv_east: [],
    dv_north: [],
    dv_heading: [],
    pitch:[],
    roll:[],
    yaw:[]
  }
  let HashTable_index = [42, 50, 58, 14, 6, 66, 70, 74, 78, 86, 94, 102, 110, 118]

  fs.readFile(pathName, function(er, buf) {
    if(er) {
      alert("系统警告，解算异常！")
      return
    }else {
      const foo = funct1
      const target = funct2
      rowStr = buf.toString('hex')
      rowStr = rowStr.replace(/dbdc/g, 'c0').replace(/dbdd/g, 'db')
      // console.log((rowStr.length - rowStr.length % 130)/130)
  
      for (const index of HashTable_index) {
        const inToArr = (index) => {
          let arr_tmp1 = target(index)
          var arr_tmp = []
          if(index === HashTable_index[0]){
            arr_tmp1.forEach(val => arr_tmp.push(foo(val)) )
            options.east = arr_tmp
          }
          else if(index === HashTable_index[1]){
            arr_tmp1.forEach(val => arr_tmp.push(foo(val)) )
            options.north = arr_tmp
          }
          else if(index === HashTable_index[2]){
            arr_tmp1.forEach(val => arr_tmp.push(foo(val)) )
            options.heading = arr_tmp
          }
          else if(index === HashTable_index[3]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 5)))
            options.timetable = arr_tmp
          }
          else if(index === HashTable_index[4]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 1)))
            options.pulse = arr_tmp
          }
          else if(index === HashTable_index[5]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 2)))
            options.v_east = arr_tmp
          }
          else if(index === HashTable_index[6]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 2)))
            options.v_north = arr_tmp
          }
          else if(index === HashTable_index[7]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 2)))
            options.v_heading = arr_tmp
          }
          else if(index === HashTable_index[8]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 3)))
            options.dv_east = arr_tmp
          }
          else if(index === HashTable_index[9]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 3)))
            options.dv_north = arr_tmp
          }
          else if(index === HashTable_index[10]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 3)))
            options.dv_heading = arr_tmp
          }
          else if(index === HashTable_index[11]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 4)))
            options.pitch = arr_tmp
          }
          else if(index === HashTable_index[12]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 4)))
            options.roll = arr_tmp
          }
          else if(index === HashTable_index[13]) {
            arr_tmp1.forEach(val => arr_tmp.push(foo(val, 4)))
            options.yaw = arr_tmp
          }
  
          arr_tmp = []
        }
        inToArr(index)
  
      }
      
      // console.log(options)
      return options
    }

  })

}

module.exports.doSomething = doSomething
