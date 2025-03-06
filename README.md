## 🌟 기술 스택

- 프레임워크: React 19
- 언어: TypeScript
- 빌드 도구: Vite
- 패키지 관리자: pnpm
- 스타일 가이드: ESLint, Prettier
- 스타일링: Tailwind CSS
- 유틸리티: cn (clsx + tailwind-merge 조합으로 구현)
- 컨테이너화: Docker, Docker Compose
- 유효성 검사 도구: react-hook-form, zod
- 데이터 관리: Repository Pattern (`localStorage` 기반)

## 🌻 설치 및 실행 방법

```bash
docker-compose up -d
```

- 브라우저에서 접속: `localhost:3000`에서 확인 가능

## 😎 도커 구성

이 프로젝트는 다음과 같은 도커 구성을 사용합니다:

- `dockerfile`: 애플리케이션 빌드 및 실행 환경 정의

## 🚀 Template Form 설계

이 프로젝트는 Google Survey Form과 비슷한 템플릿 생성 기능을 구현했어요! React, TypeScript, Zod, react-hook-form을 활용해서 깔끔하게 만들어봤습니다. 데이터 저장은 Repository Pattern으로 깔끔하게 분리했어요. 주요 컴포넌트와 그 관계, 그리고 비즈니스 로직을 어떻게 나눴는지 아래에 정리해놨어요! 😊

## 📌 컴포넌트 관계

```text
TemplateCreate
    역할: 템플릿 생성 페이지의 대장! "데이터 관리와 저장"을 책임져요.
    기능:
        유효성 검사 끝난 데이터를 받아 Repository를 통해 저장.
        UI는 심플하게, 데이터 처리와 비즈니스 로직에 집중!
    관계: TemplateForm을 불러오고, onSubmit 콜백으로 최종 데이터를 받아요.
TemplateForm
    역할: 템플릿 입력과 유효성 검사의 "컨트롤 타워"! 입력 관리자예요.
    기능:
        이름(name), 설명(description), 필드 목록(fields) 입력받기.
        Zod(TemplateSchema)로 유효성 검사 챙기기.
        react-hook-form의 FormProvider로 하위 컴포넌트와 상태 공유.
        "최소 하나의 필드가 필요합니다" 같은 필드 배열 에러 띄움.
    관계:
        TemplateCreate 밑에서 최종 데이터를 위로 올려줌.
        FieldsManager를 데리고 필드 관리 맡김.
FieldsManager
    역할: 주관식, 객관식 같은 동적 필드의 "세부 담당자"! 필드 관리 전문가예요.
    기능:
        필드 추가, 삭제, 수정 UI 제공.
        useFieldArray로 필드 배열(fields)을 동적으로 조작.
        "필드 이름은 필수입니다" 같은 개별 필드 에러 표시.
    관계: TemplateForm 밑에서 FormProvider 컨텍스트로 폼 상태와 싱크 맞춤.
```

### 🎨 관계 다이어그램

```text
TemplateCreate
    └── TemplateForm (onSubmit 콜백 전달)
        ├── FormProvider (폼 상태 공유)
        │   └── Name & Description 입력 UI
        └── FieldsManager (동적 필드 관리)
```

### 🌈 비즈니스 로직 분리

#### 🛠 설계 원칙

- `단일 책임 원칙(Single Responsibility Principle)`과 `관심사 분리(Separation of Concerns)`를 사랑해요! 각 컴포넌트가 자기 할 일만 딱 하도록 나눴고, 데이터 저장은 Repository Pattern으로 깔끔하게 분리했어요. 코드가 읽기 쉬워지고, 유지보수도 편해졌으며, 확장성도 덤으로 챙겼죠! 😎

#### ✂️ 분리된 비즈니스 로직

```text
TemplateCreate: 데이터 관리 및 저장
    책임: 유효한 데이터 받아서 Repository를 통해 저장하기.
    왜 나눴어요?:
        유효성 검사와 UI 렌더링은 TemplateForm에 맡기고, 여기선 데이터 저장과 비즈니스 로직에 집중.
        Repository Pattern 덕분에 저장 방식(localStorage, API 등) 변경이 쉬워요.
TemplateForm: 입력 & 유효성 검사
    책임: 사용자 입력 받고 유효성 체크하기.
    왜 나눴어요?:
        입력 UI와 유효성 검사는 따로 놀아야 에러 메시지 띄우기 같은 UX 개선이 편함.
        FieldsManager와 상태 공유하면서 복잡한 필드 관리 넘기기 좋아요.
FieldsManager: 필드 세부 관리
    책임: 필드 추가/삭제/수정 같은 CRUD 작업.
    왜 나눴어요?:
        텍스트, 체크박스 같은 필드 타입 UI와 로직을 묶어서 재사용성 챙김.
        개별 필드 에러 처리 독립시켜서 TemplateForm 부담 덜었어요.
LocalStorageTemplateRepository: 데이터 보관 관리
    책임: localStorage에 설문지 데이터 저장, 조회, 삭제 관리.
    왜 나눴어요?:
        Repository Pattern으로 데이터 소스를 캡슐화해서 TemplateCreate와 분리.
        나중에 서버 API나 다른 스토리지로 전환할 때 코드 수정 최소화 가능.
```

### 🌟 예시: 에러 핸들링 분리

```text
TemplateForm: "최소 하나의 필드가 필요합니다" 같은 전체 에러 띄움.
FieldsManager: "필드 이름은 필수입니다" 같은 개별 에러 띄움.
결과: 에러가 계층적으로 나뉘어서 사용자한테 더 명확하게 보여요!
```

### 🎉 설계의 장점

```text
유지보수성: 컴포넌트와 Repository마다 책임이 하나라 수정할 때 다른 데 안 튀어요.
확장성: 새 필드 타입은 FieldsManager에서, 저장 방식 바꾸기는 Repository에서 간단히!
사용자 경험: 입력 오류 바로 알려주고, 비즈니스 로직은 조용히 처리해요.
테스트 용이성: Repository를 Mock으로 대체해서 데이터 로직 테스트 쉬움.
```
