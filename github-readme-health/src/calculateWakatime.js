
function calculateWakatime(inputTime) {
    
  const DVELOPTIME_WEEK_BABYBOTTLE = 1;
  const DVELOPTIME_WEEK_TEA = 2;
  const DVELOPTIME_WEEK_COFFEE= 40;
  let drink = "";

  if(inputTime<DVELOPTIME_WEEK_BABYBOTTLE){
    drink="babyBottle";
  }else if(DVELOPTIME_WEEK_BABYBOTTLE<=inputTime&&inputTime<DVELOPTIME_WEEK_TEA){
    drink="tea";
  
  }else if(DVELOPTIME_WEEK_TEA<=inputTime&&inputTime<DVELOPTIME_WEEK_COFFEE){
    drink="coffee";
  }
  if(DVELOPTIME_WEEK_COFFEE<=inputTime){
    drink="fire";
  }
  return drink;
}

module.exports = calculateWakatime;