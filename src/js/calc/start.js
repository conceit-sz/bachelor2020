const fs = require("fs")

const doSomething = {
  init(x) {
    console.log("Corecalc computing..")
    this.options = {
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
    this.HashTable_index = [42, 50, 58, 14, 6, 66, 70, 74, 78, 86, 94, 102, 110, 118]

    this.target = (index, step=100 ) => {
      let s = []
      //step=100 的理由
      //基于课题考量 14万个包24分钟左右。即一秒钟采样7，80次 参考采样周期0.02s 频率50hz 还蛮合理。 那我一秒一个点好了 把step记为75 1905个点。 
      // 24分钟对应1440个点才好. 80 -> 1786; 95 -> 1504 100 -> 1429
      //rowStr.length / 130 修改为 rowStr.length
      if(index === 66 ||  index === 70 || index === 74) {
        while(index < rowStr.length){
          s.push(rowStr.slice(index, index + 4))
          index += 130 * step
        }
      }
      else {
        while(index < rowStr.length){
          s.push(rowStr.slice(index, index + 8))
          index += 130 * step
        }
      }
      return s
    }

    this.foo = (val, type = 0) => {
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
        var temp = []
        if((hexStr.length) % 2 === 1) {
          hexStr += ' '
        }
        for(let i = 0; i <= hexStr.length; i += 2) {
          temp += ( hexStr.substr(hexStr.length - i, 2) )
        }
            return res = hexToInt(temp)
      }
      let result = hexToInt2(val)
      if(type === 0) {result = result / (16777216*256)}
      else if(type === 2) {result = result * 0.1}
      else if(type === 3) {result = result / (16777216*16)}
      else if(type === 4) {result = result * 0.001}
      else if(type === 5) {
        let timeStr = result + ''
        timeStr = timeStr.slice(0, 5)
        let arr1 = timeStr.padStart(6,'0').split('')
        let arr = []
        for (let key = 0; key < arr1.length; key++) {
          if(key === 2 ||key === 4) {
            arr.push(':')
          }
          arr.push(arr1[key])
        }
        timeStr = arr.join('')
        return timeStr = arr.join('')
      }
      return result
    }


    //上面都是定义，下面开始执行。
    this.calc(x)
  },

  calc(pathName) {
    let self = this
    fs.readFile(pathName, function(er, buf) {
      if(er) {
        alert("???")
      }
      rowStr = buf.toString('hex')
  
      rowStr = rowStr.replace(/dbdc/g, 'c0').replace(/dbdd/g, 'db')
  
      for (const index of self.HashTable_index) {
  
        const inToArr = (index) => {
          let arr_tmp1 = self.target(index)
          var arr_tmp = []
          if(index === self.HashTable_index[0]){
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val)) )
            self.options.east = arr_tmp
          }
          else if(index === self.HashTable_index[1]){
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val)) )
            self.options.north = arr_tmp
          }
          else if(index === self.HashTable_index[2]){
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val)) )
            self.options.heading = arr_tmp
          }
          else if(index === self.HashTable_index[3]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 5)))
            self.options.timetable = arr_tmp
          }
          else if(index === self.HashTable_index[4]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 1)))
            self.options.pulse = arr_tmp
          }
          else if(index === self.HashTable_index[5]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 2)))
            self.options.v_east = arr_tmp
          }
          else if(index === self.HashTable_index[6]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 2)))
            self.options.v_north = arr_tmp
          }
          else if(index === self.HashTable_index[7]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 2)))
            self.options.v_heading = arr_tmp
          }
          else if(index === self.HashTable_index[8]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 3)))
            self.options.dv_east = arr_tmp
          }
          else if(index === self.HashTable_index[9]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 3)))
            self.options.dv_north = arr_tmp
          }
          else if(index === self.HashTable_index[10]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 3)))
            self.options.dv_heading = arr_tmp
          }
          else if(index === self.HashTable_index[11]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 4)))
            self.options.pitch = arr_tmp
          }
          else if(index === self.HashTable_index[12]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 4)))
            self.options.roll = arr_tmp
          }
          else if(index === self.HashTable_index[13]) {
            arr_tmp1.forEach(val => arr_tmp.push(self.foo(val, 4)))
            self.options.yaw = arr_tmp
          }
          // self.options.east = arr_tmp
          arr_tmp = []
        }
        inToArr(index)
  
      }
      console.log(self.options)
    })
  },

  showOptions() {
    return this.options
  }
}

module.exports.doSomething = doSomething