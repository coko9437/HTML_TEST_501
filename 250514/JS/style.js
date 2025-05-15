
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

    // 3번째 취미 가져오기 (다중 체크박스 처리해야함) => .getAll 사용
    const hobbies = formData.getAll('hobby') //여러개 요소를 가져와서 배열에 담기
    // hobbies 배열이기때문에 = ['게임', 독서', '영화보기']
    // --> hobbies.join(',') => 게임, 독서, 영화보기
    output += `출력되는 취미들 : ${hobbies.join(', ')}\n`


    output += `출력되는 성별 : ${formData.get('gender')}\n`

    output += `출력되는 나이 : ${formData.get('age')}\n`

    output += `출력되는 생년월일 : ${formData.get('date')}\n`

    output += `출력되는 이메일 : ${formData.get('email')}\n`

    // 파일 첨부확인
    const file = formData.get('file')


    //삼항 연산자 : 조건부 연산식
    // ${} : EL 표기법(Expersion Language) : 특정 값을 출력할 ㄸ 자주 사용함
    // 조건식 :
    // 1) 파일이 존재해야함.
    // 2) && : AND의 의미
    // 3)-1. (조건식) ? (참일때) : (거짓일때)
    // 3)-2. file.name ? file.name : '파일없음'
    // 3)-3. if(조건) {참 일때 실행될문장 } else {거짓일 때 실행될 문장}
    // file &&file.name ? file.name :'파일없음'
    output += `출력되는 첨부파일명 : ${file && file.name ? file.name : '파일없음'}\n`


    output += `출력되는 히든의 요소 : ${formData.get('user_id')}\n`

    // 결과를 화면에 표기하는 부분 연결
    //output의 내용을 , html 태그인 pre 태그에 출력한다.
    document.getElementById('output').textContent = output

})

// 프로필 이미지 변경시, 
// 미리보기 화면에 파일 사진 나타내기
document.getElementById('signupForm').file.addEventListener('change',
    function () {
        // 동작원리, 
        // 1) 파일 선택 2) 선택된 파일 3) 폼 양식의 파일에 변경 감지 이벤트 설정
        // 4) 파일 변경 될 때 마다 미리 보기 화면에 이미지 교체를 해줌. 
        // this : 자기 자신, -> document.getElementById('signupForm').file
        // files[0] : 현재, 파일을 하나만 선택을 합니다. 
        // 그런데, 만약에 다중 파일을 선택하는 경우도 있음. 
        // const file : 선택된 파일 이미지가 들어가 있다. 
        const file = this.files[0]
        // 조건, 무조건 이미지가 아님에도 화면에 출력을 할려고 하면 안됨. 
        // 왜? 이미지만 출력이 가능하니까. 그러면  어떻게 하죠? 
        // 검사하기 -> 파일 검사 -> 확장자가 이미지 인 경우에만 이미지로 판단
        // 출력하기. 
        // 유효성 체크라고 함. 
        //검사1) 파일이 이미지인지 확인 
        // 이미지만 출력하기
        if (file && file.type.startsWith('image/')) {
            // FileReader 클래스, 여러 기능이 탑재가 되어있다. 
            // 웹브라우저에서 지원 해줌. 
            // 파일 읽는 도구 : reader
            const reader = new FileReader();
            // reader , 파일 읽어 오게 되면, 미리보기 화면에 이미지 출력할거다.
            reader.onload = function (e) {
                // 이미지 미리보기 영역에 이미지 표시 
                // e.target.result; 선택된 이미지를 가리킴. 
                document.getElementById('profilePreview').src = e.target.result;
            }
            // 선택한 파일을 base64 인코딩하여 로드
            // 개요)
            // 선택한 파일 이미지 -> 웹 브라우저 해당 이미지를 메모리상에 가지고 있음
            // 웹브라우저에서 지원 해주는 reader 도구를 이용해서 읽기
            // 읽을 때 읽는 방법이 base64()
            // 이미지(바이너리로 구성 :0101010101) -> base64 특정의 문자열로 읽기, 
            // base64 간단 설명 
            // 이진 데이터를 텍스트(ASCII)형식으로 인코딩 
            // 주로, 이미지, 파일, 바이너리 데이터를 문자열로 가볍게 변환시 사용함. 
            // 사용하는 이유? 어느 운영체제를 가더라도, 문자열은 반드시 있음. 
            // 예를들어) 윈도우즈, 맥, 리눅스 환경, 
            // 호환성이 좋음. 그래서, 자주 사용함. 
            // 단점.) 너무 많은 데이터를 문자열 형식으로 변환작업을 하면 메모리 부족 
            // 현상이 일어남 비추
            // 결론, 미디어 서버를 따로 운영을 함. 
            reader.readAsDataURL(file)
        }
    }
)