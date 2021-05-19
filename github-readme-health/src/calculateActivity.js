
function getActivity_week(step, active_minutes, heart_minutes,heart_level) {
    var step_score = step/20;
    var low_exercise_score = active_minutes*14;
    var high_exercise_score = heart_minutes*35;
    var get_score= step_score+low_exercise_score+high_exercise_score+(heart_level*10);

    return get_score
  }

 

function calculateActivity({
    step,
    active_minutes,
    heart_minutes,
    heart_level,
  }) {
 
    //weekly least levels of physical activity 
    const MIN_WEEK_ACTIVITY = 5250;
    const MAX_WEEK_ACTIVETY = 15750;
  
    const totalScore = getActivity_week(step, active_minutes, heart_minutes,heart_level);
    let animal = "";
  
    if(MAX_WEEK_ACTIVETY<=totalScore){
        animal="horse";
    }else if(MIN_WEEK_ACTIVITY<=totalScore&&totalScore<MAX_WEEK_ACTIVETY){
        animal="dog";
    
    }else if((MIN_WEEK_ACTIVITY/2)<=totalScore&&totalScore<ACTIVITY_WEEK_COW){
        animal="pig";
    }
    if(totalScore<(MIN_WEEK_ACTIVITY/2)){
        animal="sloth";
    }
    return animal;
  }

  module.exports = calculateActivity;