# Interactive-web 제작 연습

사용한 도구
언어 : react@18.3.1 + typescript@5.7.3
(framer motion 지원 문제로 react 다운그레이드드)
상태 관리 : recoil@0.7.7
CSS 관리 : styled-components@6.1.17
빌드 : vite@6.3.2
경로 관리 : react-router-dom@7.5.1
애니메이션 : framer-motion@12.8.0
비동기 상태 관리 : react-query@3.39.3
유효성 검사 : react-hook-form@7.56.1

1. 초기 세팅

- 상태 관리 라이브러리(recoil)와 컴포넌트 추가 <RecoilRoot></RecoilRoot>
- 전역 스타일 관리 <ThemeProvider theme={theme}></ThemeProvider>
  styled.d.ts에 DefaultTheme 인터페이스의 타입 정의 및 export
  theme.ts에 theme 정의 + 호출하여 사용할 요소 정리 / 인터페이스 DefaultTheme 타입을 따르도록 정의
- CSS 초기화 컴포넌트 선언 <GlobalStyle />

- React Query 초기 세팅

1. 전역 데이터 관리 객체 생성 const client = new QueryClient();
2. <QueryClientProvider client={client}> 컴포넌트로 <App /> 컴포넌트 감싸기 + client props 전달
3. 비동기 데이터 호출 함수 파일 생성 및 함수 생성
   ex) api.ts
4. 데이터를 활용할 컴포넌트에서 호출
   const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);

-- 코드챌린지 목록

1. 헤더 카테고리 정리 및 api 연동

- api에서 카테고리별로 url 키워드보고 ${}로 가능하면 api 이름 바꿔서 모듈화하기

2. 컨텐츠 모달창 정보 추가 및 css
3. 슬라이더 타이틀 + 슬라이더별 카테고리 별도 생성
   (헤더와는 따로 // 헤더는 영화, tv 등이고 홈에서는 최근 급상승,, 요런 느낌 컨텐츠 노출하기)
4. 오른쪽 아래 고정 위치로 해서 최상단으로 올라가기 + 문의사항 보내기 화면 추가하기
   (이건 실제로 배포할 예정임)
