




# Point-weekly least levels of physical activity





Available animals are horse(15750),dog(5250~15749),pig(2625~5249),sloth(0~26249) 

The values are calculated by  simple formula using step, active_minutes, heart_minutes, heart_level  and owned google-fit-data. The implementation can be investigated at [src/calculateActivity.js](https://github.com/OpenCommit-H/github-readme-developer-health/src/calculateActivity.js)*


```
step - Actual steps

active_minute -  Low intensity exercise time

heart_minutes - High Strength Exercise Time

heart_level - Heart Reinforcement Score
```



## simple formula


weekly least levels of physical activity

The minimum number of steps per week is 21000.

A week's light exercise time is at least 150 minutes.

A week's strenuous exercise time is at least 60 minutes.

We set a criteria of 2100.  Each data is set to 2100.  Point is 20% step, 40% light exercise, and 40% high strength exercise. +(heart_level*10).

Each week, when the minimum level of physical activity is reached, 5250 points and dog images can be obtained.

1. Low intensity exercise is done five times a week for two hours.

2. High intensity exercise is done five times a week for 30 minutes.

3. 21000 step

If you satisfy 1, 2, 3, you can get the image of a horse.



(If you have a better calculation, please share.)