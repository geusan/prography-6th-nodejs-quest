# Prography 6th NodeJS Quest

> NodeJS 전형의 점수는 **면접(70%), 과제(30%)** 입니다. 과제의 미완성이 합격에 큰 영향을 주지 않습니다.

## 개요

이 과제는 프로그라피 활동에 필요한 기초적인 개발 능력을 측정합니다. API 구현 과제로 할일을 기록 관리할 수 있는 서버 어플리케이션을 만듭니다. 전체 API 목록 중 **정상 작동하는 API의 갯수를 세는 방식** 으로 채점합니다. 채점에는 e2e 테스트를 진행합니다. 테스트 라이브러리로는 [jest](https://jestjs.io/)와 [supertest](https://github.com/visionmedia/supertest)를 사용합니다.

과제 수행에는 테스트 수행을 위해 가장 많이 쓰이는 서버 프레임워크 [express](https://www.npmjs.com/package/express)를 사용하는 것을 권장합니다. 현재 이 과제가 속해있는 레포에 샘플 앱이 구현되어 있으며, 이외에 다른 라이브러리를 사용하셔도 불이익은 전혀없습니다. 데이터베이스와 ORM 선택은 완전 자유입니다.

## 개발환경

오직 개발에만 전념할 수 있도록 개발유틸 일부가 포함된 상태입니다. `npm start`로 실행할 수 있습니다.
`src/` 폴더 내에서 자유롭게 개발해주시면 됩니다.

- Node 10 이상
- ES6 이상 문법 사용(babel-node)
- nodemon(코드 수정시 자동 재시작)
- dotenv(환경변수 모듈)

## 과제

할일을 만들고 관리를 할 수 있는 Restful API 서버를 구현해주시기 바랍니다.
이 프로그램은 다음과 같은 기능이 있습니다. (옵션)으로 표시된 내용은 가산점 항목입니다.

- 할일이 있다.
- 할일은 다음의 필드를 가지고 있다.
  ```Typescript
  Todo {
    id: number, // 식별 아이디, auto increment
    title: string, // 제목
    description: string, // 할일 내용
    tags: string[], // 할일 분류 태그, ex: ["prography", "nodejs"]
    isCompleted: boolean, // 완료여부, default: false
    createdAt: Date, // 생성일, auto create
    updatedAt: Date, // 수정일, auto update
  }
  ```
- 할일을 등록/수정/삭제 할 수 있다.
- 할일을 완료 표시를 할 수 있다.
- (옵션)할일에 태그를 삽입할 수 있다.
- (옵션)할일을 태그로 모아서 볼 수 있다.
- (옵션)할일을 생성된 순서로 정렬할 수 있다.
- (옵션)할일을 제목 또는 설명의 내용의 일부분으로 검색할 수 있다.
- 할일에 코멘트(댓글)을 등록/수정/삭제 할 수 있다.
- 코멘트는 다음의 필드를 가지고 있다.
  ```Typescript
  Comment {
    id: number, // 식별 아이디, auto increment
    todoId: number, // 할일 아이디 외래키, reference by Todo
    contents: string, // 댓글 내용
    createdAt: Date, // 생성일, auto create
    updatedAt: Date, // 수정일, auto update
  }
  ```

이 서버에서 요구하는 API는 총 11개입니다.

1. 할일 등록: `POST /todos`
2. 할일 목록: `GET /todos`
3. 할일 읽기: `GET /todos/:todoId`
4. 할일 수정: `PUT /todos/:todoId`
5. 할일 완료: `PUT /todos/:todoId/complete`
6. 할일 삭제: `DELETE /todos/:todoId`
7. 댓글 등록: `POST /todos/:todoId/comments`
8. 댓글 목록: `GET /todos/:todoId/comments`
9. 댓글 읽기: `GET /todos/:todoId/comments/:commentId`
10. 댓글 수정: `PUT /todos/:todoId/comments/:commentId`
11. 댓글 삭제: `DELETE /todos/:todoId/comments/:commentId`

각 API는 다음의 응답 특징을 가집니다. [response, request 예시](./example.md)

- 목록(GET) 기능은 배열형식으로 응답됩니다.
- 읽기(GET) 기능은 내용 필드들이 object 형태로 응답됩니다.
- 등록(POST) 기능은 클라이언트가 보낸 값에 자동으로 생성된 필드(id, createdAt, updatedAt 등)가 함께 응답됩니다.
- 수정(PUT) 기능은 클라이언트가 보낸 값으로 갱신이 된 내용이 응답됩니다.
- 삭제(DELETE) 기능은 `{"msg": "success"}` 가 응답됩니다.

### 가산점 항목

- 브랜치전략을 나누어서 개발
- validation 처리, 빈값 또는 잘못된 값의 경우 클라이언트 측 에러임을 알려주기
- 아래의 기능을 추가로 개발합니다.
  1. 할일 정렬: `GET /todos?order[createdAt]=desc`
  2. 할일 검색1: `GET /todos?title=%과제%`
  3. 할일 검색2: `GET /todos?description=%프로그라피%`
  4. 할일 검색3: `GET /todos?tags[]=prography&tags[]=nodejs`

> **Tip**: 위의 URL쿼리(`?order[createdAt]=desc`)의 경우 [qs 라이브러리](https://www.npmjs.com/package/qs)를 사용하시면 쉽게 구현이 가능합니다.

### 제출방법

이 레포를 지원자의 Github으로 fork 한뒤에 개발을 진행하시면 됩니다. 마감일 기준 23:59:59 까지의 커밋까지 인정됩니다.

***

#### [부록] 채점 방법

각 API들에 대하여 e2e 테스트를 진행합니다.

test 폴더에 정의되어있습니다.

`npm test` 명령어로 실시할 수 있습니다.
