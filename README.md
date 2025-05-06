# Interactive-web 제작 연습

사용한 도구
언어 : react@18.3.1 + typescript@5.7.3
(framer motion 지원 문제로 react 다운그레이드)
CSS 관리 : styled-components@6.1.17
빌드 : vite@6.3.2
경로 관리 : react-router-dom@7.5.1
애니메이션 : framer-motion@12.8.0
비동기 상태 관리 : react-query@3.39.3
유효성 검사 : react-hook-form@7.56.1
이메일 발송 라이브러리 : emailjs@4.0.3

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
<헤더>
⭕ 헤더 카테고리 정리 - 배열을 통한 확장성 고려
⭕ 헤더 카테고리별 api 분류 및 호출
카테고리(now_playing, popular, top_rated, upcoming)

<슬라이더 부문>
⭕ 양 끝 prev, next 버튼
⭕ 슬라이더 타이틀 제작
⭕ 슬라이더 타이틀 버튼 제작
⭕ 슬라이더 카테고리 생성(최근 급상승, 유행하는 영화 이런 류)
⭕ 슬라이더 방향 전환 시 고장(row에도 custom 전달)

<편의성 UI 부문>
⭕ 우측 하단 고정 위치 top이상 버튼 / padding 때문에 최상단 이동 X
⭕ 우측 하단 문의사항 문의 버튼 제작

<컨텐츠 모달창 부문>
⭕ 정보 추가 및 css
