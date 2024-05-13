### URL 구조

| url | 이름 | 기능 |
| --- | --- | --- |
| / | 홈 | 로그인 or 회원가입 창으로 이동 |
| /login | 로그인 페이지 | 로그인 |
| /signup | 회원가입 페이지 | 회원가입(id, pw, userType 입력) |
| /project | 전체 프로젝트 조회 페이지 | - 프로젝트 리스트 조회,생성<br/>- 프로젝트 별로 사용자 추가 |
| /project/[id] | 프로젝트별 전체 이슈 조회 페이지 | - 프로젝트 별 이슈 리스트 조회 <br/>- 이슈 title, state, reporter, assigner, fixer 확인 <br/> - 조건 별로 이슈 검색(assignee, state) |
| /project/[id]/{issueId} | 이슈 상세 모델 | - 이슈 상세 정보 확인<br/>- 이슈 필드 내용 전체 불러오기<br/>- 이슈 상태 및 정보 수정 |