let $ = s => document.querySelector(s)
let $$ = s => document.querySelectorAll(s)

const Index = {
  init() {
    this.$start = $("button.start")
    
    this.bind()
  },

  bind() {
    this.$start.onclick = () => {
      console.log("hello")
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