const { dialog } = require("electron").remote
const doSomething = require("./js/calc/start").doSomething
const echarts = require('echarts')

let $ = s => document.querySelector(s)
let $$ = s => document.querySelectorAll(s)


const Index = {
  init() {
    this.$start = $("button.start")
    this.$speech = $("div.speech")
    this.$content = $("div.content")
    
    this.bind()
  },

  bind() {
    this.$start.addEventListener("click", () => {
      this.readFile()
      setTimeout(()=> this.$speech.classList.add("clicked"))
    })
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
        CoreCalc.init(pathName)
        this.$speech.classList.add("hidden")
        this.$content.classList.add("appear")
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
    this.options2 = []

    this.start(pathName)
  },

  start(m) {
    this.options = this.doSomething(m)
  },

  render() {
    
  }

}

const MainWork = {
  init() {
    console.log("Mainwork init..")
    this.$$sections = $$(".header .section")
    this.$$modules = $$(".main .module")
    this.$line = $(".header .line")
    console.log(this.$$sections[0].offsetLeft)
    // this.$line.style.width =`${this.$$sections[0].offsetWidth}px`
    // this.$line.style.transform = `translateX(${this.$$sections[0].offsetLeft}px)`
    this.$line.style.width = "41px"
    this.$line.style.transform = `translateX(185px)`

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
      }
    })
  }

}

const App = {
  init() {
    console.log("App init..");
    [...arguments].forEach(Module => Module.init())
  }
}

App.init(Index, MainWork)