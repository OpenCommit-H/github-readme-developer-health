
function getActivity_week(step, active_minutes, heart_minutes,heart_level) {
    var step_score = step/2;
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

    const ACTIVITY_WEEK_SLOTH = 1;
    const ACTIVITY_WEEK_DOG = 5250;
    const ACTIVITY_WEEK_COW= 9187.5;
    const ACTIVITY_WEEK_HORSE= 10500;
    const ACTIVITY_MAX_SCORE=13125;
  
    const totalScore = getActivity_week(step, active_minutes, heart_minutes,heart_level);
     
    let animal = "";
  
    if(ACTIVITY_WEEK_HORSE<=totalScore){
        animal="horse";
    }else if(ACTIVITY_WEEK_COW<=totalScore&&totalScore<ACTIVITY_WEEK_HORSE){
        animal="cow";
    }else if(ACTIVITY_WEEK_DOG<=totalScore&&totalScore<ACTIVITY_WEEK_COW){
        animal="dog";
    
    if(totalScore<ACTIVITY_WEEK_DOG){
        animal="sloth";
    }
  
    return animal;
  }
}
  

  
  module.exports = calculateActivity;