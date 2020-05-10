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

module.exports.foo = foo