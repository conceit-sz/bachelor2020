function translate(msg) {
  // const HashTable_index = [42, 50, 58, 14, 6, 66, 70, 74, 78, 86, 94, 102, 110, 118]
  const HashTable_name = ["east", "north", "heading", "timetable", "pulse", "v_east", "v_north", "v_heading", "dv_east", "dv_north", "dv_heading", "pitch", "roll", "yaw"]
  const HashTable_chName = ["东向角度","北向角度","天向角度","时刻","脉冲数","东向速度","北向速度","天向速度","东向速度增量","北向速度增量","天向速度增量","俯仰角","横滚角","航向角"]

  if(typeof msg === "number") {
    // console.log(HashTable_chName[msg])
    return HashTable_chName[msg]
  }else{
    let index = HashTable_name.indexOf(msg)
    return HashTable_chName[index]
  }
}
module.exports.translate = translate