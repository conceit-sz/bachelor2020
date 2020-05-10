const { dialog } = require("electron").remote
const doSomething = require("./js/calc/start").doSomething
const translate = require("./js/render/translate").translate
const echarts = require('echarts')


let $ = s => document.querySelector(s)
let $$ = s => document.querySelectorAll(s)


const Index = {
  init() {
    this.$start = $("button.start")
    this.$speech = $("div.speech")
    this.$content = $("div.content")
    this.$info = $("button.info")
    
    this.bind()
  },

  bind() {
    this.$start.addEventListener("click", () => {
      this.readFile()
      setTimeout(()=> this.$speech.classList.add("clicked"))
      // $$(".header .section")[0].click()
    })
    this.$info.onclick = () => {
      this.$speech.classList.add("hidden")
      this.$content.classList.add("appear")

      setTimeout(() => MainWork.init("info"),30)
    }
  },

  readFile() {
    dialog.showOpenDialog( {
      properties: ["openfile"],
      filters: [
        {name:"din file type only", extensions:['din']}
      ]
    }).then(result => {
      if(result.filePaths.length !== 0) {


        let pathName = result.filePaths[0]
        console.log(`your path is:\t${pathName}`)
        CoreCalc.init(pathName)
        this.$speech.classList.add("hidden")
        this.$content.classList.add("appear")

        $$(".header .section")[0].click()
        setTimeout(() => MainWork.init(),30)
      }
    }).catch(error => {
      console.log(error)
      alert("读取操作失败。")
    }).finally(() => {
      this.$speech.classList.remove("clicked")
    })
  }
}

const CoreCalc = {
  init(pathName) {
    console.log("CoreCalc init..")
    this.doSomething = doSomething
    this.options = {}
    this.$exa_sel  = $('#example-select')

    this.start(pathName)
  },

  start(m) {
    this.doSomething.init(m)
    this.options = this.doSomething.showOptions()
    setTimeout(()=>console.log(this.options),200)
    setTimeout(() => this.render(),500)
  },

  render() {
    console.log("CoreCalc rendering..")
    let key = this

    let self = {} 

    var dom = document.getElementById("echarts");
    var myChart = echarts.init(dom);
    self = myChart;
    var app = {};
    option = null;
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < this.options.east.length; i++) {
      xAxisData.push(this.options.timetable[i]);
      data1.push(this.options.east[i]);
      // data2.push(this.options.north[i]);
      // data2.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 0.5e-7);
    }
    console.log(`渲染数组长度：\t${data1.length}`)
  
    option = {
        title: {
            text: '时段维度-解算单元数据'
        },
        legend: {
            data: ['东向角度']
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
        tooltip: {},
        dataZoom: [
          {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 100
          },
          // {
          //     type: 'slider',
          //     show: true,
          //     yAxisIndex: [0],
          //     left: '93%',
          //     start: 0,
          //     end: 100
          // },
          {
              type: 'inside',
              xAxisIndex: [0],
              start: 0,
              end: 100
          }
          // },
          // {
          //     type: 'inside',
          //     yAxisIndex: [0],
          //     start: 0,
          //     end: 100
          // }
      ],
        xAxis: {
            data: xAxisData,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: '东向角度',
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
    };;

      
    this.$exa_sel.onchange = function() {
      // console.log(this.value)
      // console.log(`${this.value} + ${key.options[this.value]}`)
      var option = self.getOption();
        option.series[0].data = key.options[this.value];
        option.series[0].name = translate(this.value);
        option.legend[0].data[0] = translate(this.value);
        // 错option.series[0].data = translate(key.options[this.value]);
        // 对option.series[0].name = translate(this.value);
        // 对option.legend[0].data[0] = translate(this.value);
        self.setOption(option);
    }
  }
}

const MainWork = {
  init(flag="") {
    console.log("Mainwork init..")
    this.$$sections = $$(".header .section")
    this.$$modules = $$(".main .module")
    this.$line = $(".header .line")
    this.$line.style.width = `${this.$$sections[0].offsetWidth}px`
    this.$line.style.transform = `translateX(${this.$$sections[0].offsetLeft}px)`
    this.$content = $(".content.appear")
    this.flag = flag

    this.bind()
  },

  bind() {
    this.$$sections.forEach($section => {
      $section.onclick = () => {
        this.$$sections.forEach($section => $section.classList.remove("active"))
        $section.classList.add("active")
        let index = Array.from(this.$$sections).indexOf($section)
        this.$$modules.forEach($module => $module.classList.remove("active"))
        this.$$modules[index].classList.add("active")

        this.$line.style.width = `${$section.offsetWidth}px`
        this.$line.style.transform = `translateX(${$section.offsetLeft}px)`

        if(index === 3) {
          this.$content.classList.add("forth")
        }else {
          this.$content.classList.remove("forth")
        }
      }
    })
    if(this.flag === "info") {
      this.$$sections[3].click()
      this.flag=""
    }
  }

}

const App = {
  init() {
    console.log("App init..");
    [...arguments].forEach(Module => Module.init())
  }
}

App.init(Index)
