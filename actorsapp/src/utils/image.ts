// public/ 경로 이미지에 BASE_URL 적용 (로컬: /, 배포: /actorgram/)
export const img = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
