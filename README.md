# Interactive-web 제작 연습

사용한 도구
언어 : React@19.1.2 + typescript@5.7.3
상태 관리 : Recoil@0.7.7
CSS 관리 : styled-components@6.1.17
빌드 : vite@6.3.2
경로 관리 : react-router-dom@7.5.1
애니메이션 : framer motion << 버전 문제 떄문에 나중에 react 버전 다운그레이드 해야함

1. 초기 세팅

- 상태 관리 라이브러리(recoil)와 컴포넌트 추가 <RecoilRoot></RecoilRoot>
- 전역 스타일 관리 <ThemeProvider theme={theme}></ThemeProvider>
  styled.d.ts에 DefaultTheme 인터페이스의 타입 정의 및 export
  theme.ts에 theme 정의 + 호출하여 사용할 요소 정리 / 인터페이스 DefaultTheme 타입을 따르도록 정의
- CSS 초기화 컴포넌트 선언 <GlobalStyle />
