# [Live]Interactive-web 제작 연습
[라이브서버 주소](https://interactive-website-b0325.web.app/)<br/><br/>
## 사용한 도구
언어 : react@18.3.1 + typescript@5.7.3<br/>
(framer motion 지원 문제로 react 다운그레이드)<br/>
CSS 관리 : styled-components@6.1.17<br/>
빌드 : vite@6.3.2<br/>
경로 관리 : react-router-dom@7.5.1<br/>
애니메이션 : framer-motion@12.8.0<br/>
비동기 상태 관리 : react-query@3.39.3<br/>
유효성 검사 : react-hook-form@7.56.1<br/>
이메일 발송 라이브러리 : emailjs@4.0.3<br/>
API : TMDB API<br/>
배포 : firebase

## 구현한 기능
- 헤더
  1. 헤더 카테고리 리팩토링<br/>
  **목적 : 확장성 고려 하드코딩 대신 배열을 통한 관리 선택**<br/>
  as-is : 카테고리별 하드코딩<br/>
  to-be : categories 배열을 통해 관리<br/>

  2. 헤더 카테고리별 페이지 구현<br/>

- 컨텐츠 슬라이더
  1. prev, next 버튼 및 기능 구현<br/>
  2. 슬라이더 타이틀 제작 및 빠른 이동 기능 구현<br/>

- UI & UX 개선
  1. 최상단 이동 버튼 제작<br/>
  2. 문의사항 문의 및 이메일 발송 기능 구현<br/>

- 컨텐츠 모달창
  1. Rate 정보 추가 및 시각화<br/>
