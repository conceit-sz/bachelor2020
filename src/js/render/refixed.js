const refixed = (options) => {
  console.log("options2 generating")

  let length = Object.entries(options)[0][1].length
  let tmpy = []
  for(let m=0; m < length; m++) {
    let tmpx = []
    Object.entries(options).forEach(tmp => {
      tmpx.push(tmp[1][m])
      // console.log(tmp[1][m])
    })
    tmpy.push(tmpx)
    // console.log(tmpx)
  }
  // console.log(tmpy)
  return tmpy
}
module.exports.refixed = refixed