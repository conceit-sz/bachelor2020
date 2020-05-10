const target = (index, step=100 ) => {
  let s = []
  //step=100 的理由
  //基于课题考量 14万个包24分钟左右。即一秒钟采样7，80次 参考采样周期0.02s 频率50hz 还蛮合理。 那我一秒一个点好了 把step记为75 1905个点。 
  // 24分钟对应1440个点才好. 80 -> 1786; 95 -> 1504 100 -> 1429
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

module.exports.target = target