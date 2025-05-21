
document.getElementById('signupForm').addEventListener('submit', function (e) {
    // e : 이벤트의 약자, 웹 브라우저에서 제공해주는 기능 도구 객체
    // preventDefault() : 기본 제출동작(서버에제출)을 막는용도 (페이지 리로드 방지)
    e.preventDefault()

    // FormData 클래스 : 변수 상수 기능(함수)들의 모음집
    // new FormData() : 클래스를 이용하려면 초기화를 먼저해야함 (=생성자를 호출함)
    // this : 자기자신을 의미함. = document.getElementById('signupForm')

    const formData = new FormData(this); // 폼 데이터를 수집
    // 유저가 입력한 내용이 FormData 클래스에 담겨져있음.

    // let 변수명 = 값  : 값을 변경이 가능함.    <--> const 상수명 = 값   : 값 변경불가
    let output = "" // 결과의 내용을 담을 변수, 초기에는 ("")빈 문자열 초기화.


    //단일 입력 필드 처리.

    // output += : output + "내용" ....ex) x= x+1 -> x +=1 x에 1을 더한다.
    // ` : 백틱 (문자열을 표기함)

    // 1번 유저명부터 표기해보기
    output += `출력되는 유저명 : ${formData.get('username')}\n`

    // 2번째요소 패스워드 가져오기
    output += `출력되는 패스워드 : ${formData.get('password')}\n`

    
    document.getElementById('output').textContent = output

})