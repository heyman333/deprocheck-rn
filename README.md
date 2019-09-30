# deprocheck-rn

디프만 출첵 앱 RN 버전

# 다음기술을 사용합니다.

1. React-Native (0.60.x)
2. React hooks
3. ~~Mobx4~~ Context(useContext)
4. styled-components
5. typescript
6. Hermes
7. firebase

# 지도 설정 방법

1. `google map key`는 `.env`파일로 따로 뺴서 관리 합니다.
2. `.env` 파일을 루트에 생성하고 다음처럼 iOS / Android google map key를 넣어줍니다.

```
IOS_GOOGLE_MAP_KEY=AIzaSyAeBN4N...blabla
ANDROID_GOOGLE_MAP_KEY=AIzaSyBAyY...blabla
```

3. 파이어베이스 연동을 위한 `google-services` 파일 또한 올리지 않습니다. `Author`에게 연락하거나 새로 파이어베이스 프로젝트를 생성 후 디버깅 해주세요
