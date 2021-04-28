# Wakatime Api

### 초기 셋팅

1. 회원가입 (깃허브 계정 연동 가능) [Wakatime](https://wakatime.com/)
2. 사용하는 ide에 맞게 플러그인 설치
   - [Supported IDEs](https://wakatime.com/plugins)
   - profile(우측 상단) -> Settings -> Account에서 wakatime api key 조회 가능
3. 계정 권한 설정
   - profile -> Settings -> Edit profile
   - username 입력 (api사용시 url에 username으로 사용)
   - 하단에 publicly 체크 박스에서 code time과 languages등을 선택하여 조회가 가능하게 설정

4. Example

   - ```
     https://wakatime.com/api/v1/users/${username}/stats/last_7_days
     ```

   - [Api docs](https://wakatime.com/developers) 에서 stats참고

     

### 유의미한 데이터

```javascript
const { data } = await axios.get(
      `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`,
    );
```

> 위와 같은 url로 api 요청시 json type 결과는 data 변수에 할당
>
> data.data로 내부 데이터 접근

1. languages
   - 언어별로 개발한 시간 데이터 리스트
   - 시간과 분, 퍼센트, 언어
2. editors
   - IDE별로 개발한 시간 데이터 리스트
   - 시간과 분 퍼센트, IDE
3. total_seconds, total_seconds_other_language
   - 전체적인 작업 시간
4. daily_average, daily_average_including_other_language
   - 일별 평균 개발 시간을 나타냄(holiday 제외)
5. holidays, days_minus_holidays, days_including_holidays
   - holidays: 개발을 아예 안한 날은 holiday취급, 이에 해당하는 일 수
6. 문제점
   - 데이터 조회시 일 수 에서 7일, 30일, 6개월, 1년의 제한이 있다.(daily로는 조회 불가)
   - 데이터가 충분하지 않아서인지 7일 이외의 기간은 조회가 안되는 문제 발생