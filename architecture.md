# 노아이커피(Noi Coffee) 웹사이트 개발 에이전트 설계서

[cite_start]나는 '노아이커피 소개용 웹사이트 구축'을 자동화하는 에이전트 시스템을 설계하려고 한다. [cite: 47]

## [cite_start]1. 직업 개요 [cite: 48]
* [cite_start]**목적**: Loveespresso(loveespresso.cafe)의 전체적인 색감, 레이아웃, 스크롤 애니메이션을 벤치마킹하여 노아이커피 브랜드를 소개하는 랜딩 페이지 제작. [cite: 49]
* [cite_start]**입력**: [cite: 50]
    * 레퍼런스: https://loveespresso.cafe/ (Movie, Store 섹션 제외)
    * 데이터 소스: 타베로그(https://tabelog.com/hokkaido/A0101/A010303/1083597/), 인스타그램(https://www.instagram.com/noi.coffee05/)
    * 로컬 에셋: 사용자가 지정한 폴더 내의 로고 및 카페 이미지 파일
* [cite_start]**출력**: Google Antigravity 기반으로 작성된 완전한 프론트엔드 웹사이트 소스 코드. [cite: 51]
* [cite_start]**주요 제약조건**: [cite: 52]
    * [cite_start]UI 구성은 반드시 Tailwind CSS + shadcn/ui 조합을 사용한다. [cite: 3]
    * 온라인 결제(Stripe) 기능 및 스토어, 유튜브(Movie) 섹션은 구현하지 않는다. 
    * [cite_start]배포는 Vercel을 통해 원클릭으로 자동화될 수 있도록 세팅한다. [cite: 14]

## [cite_start]2. 작업 컨텍스트 문서 [cite: 59]
* **배경 및 목적**: 삿포로 시로이시구에 위치한 노아이커피의 고객 안내 및 브랜드 경험 제공을 위한 공식 홈페이지가 필요함.
* **범위**: 메인 랜딩 페이지 (히어로 애니메이션, 카페 소개, 메뉴/갤러리, 오시는 길/영업시간).

## [cite_start]3. 워크플로우 정의 [cite: 61]
1.  **데이터 파싱 및 구조화 (스크립트 처리)**: 타베로그 및 인스타그램 URL에서 텍스트 정보(영업시간, 주소, 메뉴명 등)를 추출하여 JSON 형태로 저장. 
2.  [cite_start]**UI/UX 레이아웃 클론 (에이전트 판단)**: Loveespresso 사이트의 스크롤 애니메이션과 여백 구조를 분석하여 Tailwind 기반의 골격 생성. [cite: 96]
3.  [cite_start]**컴포넌트 조립 (스크립트 + 에이전트)**: shadcn/ui를 활용하여 버튼, 카드, 네비게이션 바 등의 UI 요소를 배치. [cite: 4]
4.  **에셋 바인딩 및 완성 (에이전트)**: 로컬 폴더에 준비된 이미지와 로고를 UI에 삽입하고 렌더링 확인.
5.  [cite_start]**성능 점검 (스크립트)**: Lighthouse로 성능을 점검하여 점수가 70 아래면 수정 루프를 돈다. [cite: 29, 30]

* [cite_start]**성능 검증 방식**: 규칙 기반 (Lighthouse 점수 70점 이상, 모바일 반응형 깨짐 없음). [cite: 107]
* [cite_start]**실패 시 처리**: 에러 발생 시 자동 재시도를 2회 수행하며, 디자인적 판단이 모호할 경우 에스컬레이션하여 사람(사용자)에게 묻는다. [cite: 118, 120]

## [cite_start]4. 구현 스펙 [cite: 67]
### [cite_start][폴더 구조] [cite: 76]
[cite_start]폴더 구조는 처음부터 예측 가능하고 깔끔하게 유지한다. [cite: 38, 39]
* `/app`: 페이지 라우팅 및 메인 뷰
* [cite_start]`/components`: shadcn/ui 및 재사용 가능한 UI 컴포넌트 (UI는 Tailwind + shadcn/ui 조합이 정답이다. [cite: 3])
* `/public/assets`: 로고 및 인테리어/메뉴 이미지
* [cite_start]`/.claude`: 에이전트 설정 파일 배치 [cite: 77]
* [cite_start]`README.md`: 첫날에 바로 작성하여 프로젝트 목적 기록 [cite: 36]

### [cite_start][판단과 코드의 역할 분리] [cite: 88]
* [cite_start]**에이전트가 직접 수행**: Loveespresso의 '감성' 및 '애니메이션 타이밍' 등 정성적 요소 클론, 레이아웃 균형 판단. [cite: 96, 97]
* [cite_start]**스크립트로 처리**: 외부 URL(타베로그/인스타) 텍스트 파싱, Vercel 배포 세팅. [cite: 96, 97]

> 완벽보다 출시가 먼저입니다. [cite_start]MVP의 목표는 완성이 아니라 학습이므로, 우선적으로 카페 정보를 알리는 기본 뷰를 완성하는 것에 집중합니다. [cite: 44, 45]