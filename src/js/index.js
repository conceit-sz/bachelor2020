const { dialog } = require("electron").remote
const doSomething = require("./js/calc/start").doSomething

let $ = s => document.querySelector(s)
let $$ = s => document.querySelectorAll(s)


const Index = {
  init() {
    this.$start = $("button.start")
    this.$speech = $("div.speech")
    this.$$modules = $$("div.module")
    
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
        this.$$modules.forEach($module => $module.classList.add("appear"))
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

const App = {
  init() {
    console.log("App init..");
    [...arguments].forEach(Module => Module.init())
  }
}

App.init(Index)