// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs')
//1.1 目的：得到path。策略：操作DOM元素，实现选取文件。
//1.2









//2.1 目的：得到arr_tmp[],里面放满的是所有十进制东向角数据。策略：单步调试。
//2.2 目的： 得到options。
// const arr_tmp = []


let options = {
  east: [],
  north: [],
  heading: []
}
let HashTable_index = [42, 50, 58]

//测试
const pathName = '../src/INS.din'

fs.readFile(pathName, function(er, buf) {
  if(er) {
    alert("???")
  }
  rowStr = buf.toString('hex')
  rowStr = rowStr.replace(/dbc0/g, 'dc').replace(/dbdb/g, 'dd')
  // console.log(rowStr.length % 130)
  console.log((rowStr.length - rowStr.length % 130)/130)

  // console.log(rowStr.indexOf('9ff1ffff'))
  // console.log(rowStr.indexOf('e3fbffff'))
  // console.log(rowStr.indexOf('d0fcffff'))

  for (const index of HashTable_index) {
    // let index = rowStr.indexOf('9ff1ffff')
    const inToArr = (index) => {
      let arr_tmp1 = target(index)
      // console.log(arr_tmp1)
      // console.log(foo(arr_tmp1[0]))
      var arr_tmp = []
      arr_tmp1.forEach(val => arr_tmp.push(foo(val)) )
      // var arr_tmp = []
      // console.log(arr_tmp)
      if(index === HashTable_index[0]){
        options.east = arr_tmp
      }
      else if(index === HashTable_index[1]){
        options.north = arr_tmp
      }
      else if(index === HashTable_index[2]){
        options.heading = arr_tmp
      }
      // options.east = arr_tmp
      arr_tmp = []
    }
    inToArr(index)

  }
  console.log(options)
  // options.test = [1,-8.570495992898941e-7,3,3,3,3]
  // console.log(options.east[0] * 10000000)
  // console.log(JSON.stringify(options))
})

const target = (index, step=100 ) => {
  let s = []
  //step=10: 
  //基于课题考量 14万个包24分钟左右。即一秒钟采样7，80次 参考采样周期0.02s 频率50hz 还蛮合理。 那我一秒一个点好了 把step记为75 1905个点。 
  // 24分钟对应1440个点才好. 80 -> 1786; 95 -> 1504 100 -> 1429
  //rowStr.length / 130 修改为 rowStr.length
  while(index < rowStr.length){
    s.push(rowStr.slice(index, index + 8))
    index += 130 * step
  }
  return s
}

const foo = (val, type = 0) => {
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
  if(type === 0) {result = result / (16777216*256)}
  return result
}



// 3. json
let $json = document.querySelector(".json")
$json.onclick = function() {
  let x = Math.random()
  fs.writeFile(`./${x}.json`, JSON.stringify(options), () => alert('文件在软件目录中，你成功啦'))
}






// 4.
 let $exa_sel  = document.querySelector('#example-select')
 $display1 = document.querySelector('.display1')
 $exa_sel.onchange = function() {
   console.log(this.value)
  //  $display1.innerText = options[this.value]
   var option = self.getOption();
    option.series[0].data = options[this.value];   
    self.setOption(option);
 }

 // 5.
//推断： 以下操作是同步操作，异步的文档操作使得data1,data2无法赋值！因为options还是空的呀！
//修改为readFileSync() 不可，同步方法没有回调。
//setTimeout() 调了一个较好的时长进去，太短还是会失败。

//使用self的原因：如何让echarts自动更新数据：https://blog.csdn.net/qq_35448976/article/details/79072788
// 在外部使用这段代码就可以刷新数据：
// var option = self.getOption();
// option.series[0].data = options.heading;   
// self.setOption(option); 

let self = {} 
setTimeout(() => {
var dom = document.getElementById("echarts");
var myChart = echarts.init(dom);
self = myChart
var app = {};
option = null;
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 1504; i++) {
    xAxisData.push('间隔' + i);
    // data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data1.push(options.east[i]);
    data2.push(options.north[i]);
    // data2.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 0.5e-7);
}
console.log(data1)

option = {
    title: {
        text: '柱状图动画延迟'
    },
    legend: {
        data: ['bar', 'bar2']
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
    // tooltip: {},
    xAxis: {
        data: xAxisData,
        splitLine: {
            show: false
        }
    },
    yAxis: {
    },
    series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 1;
        }
    }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
            return idx * 1 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 1;
    }
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);

}
//>>>>>>>>>>>>>>>>>>>>>>

}, 80)