

function updateTime (date){
  date = new Date(date)

  const year = date.getFullYear();
  const month = addZero(date.getMonth()+1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours())
  const minutes = addZero(date.getMinutes())
  const seconds = addZero(date.getSeconds())
  return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`

}

function addZero(time){
  if(time<10){
    return `0${time}`
  }
  return time
}

export default updateTime

