import { useState } from 'react'
import { api } from '../api/client'
import { useToken } from '../store/useTokenStore'
import { useUserStore } from '../store/useUserStore'
import { useSimpleMutation } from '../api/Helper/useSimpleMutation'
import Button from '../components/common/Button'

interface ApiTest {
  id: string
  name: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  body?: Record<string, unknown>
  skipAuth?: boolean
}

// 여기다가 추가해서 테스트
const API_TESTS: ApiTest[] = [
  {
    id: 'login',
    name: '로그인',
    method: 'post',
    url: '/v1/auth/login',
    body: { email: 'test@test.com', password: 'password123' },
    skipAuth: true,
  },
  {
    id: 'logout',
    name: '로그아웃',
    method: 'post',
    url: '/v1/auth/logout',
  },

  {
    id: 'getUserMe',
    name: '내 정보 조회',
    method: 'get',
    url: '/v1/me',
  },
  {
    id: 'updateProfile',
    name: '내정보 수정 - 일반정보수정',
    method: 'patch',
    url: '/v1/users/me',
    body: {
      nickname: 'ozdev2',
      profile_image_url: 'https://cdn.example.com/u/ozdev2.png',
      phone_number: '01012345678',
      verify_token: 'eyJhbGciOi...', // 휴대폰 변경 시에만 필수
    },
  },
]

export default function ApiTestPage() {
  const [selectedId, setSelectedId] = useState<string>('')
  const { accessToken, setAccessToken } = useToken()
  const { user, setUser } = useUserStore()

  // 더미 로그인
  const handleMockLogin = () => {
    const token = 'access_token_' + Date.now()
    setAccessToken(token)
    setUser({ id: 1, email: 'test@test.com', nickname: '테스트' })
  }

  // api 테스트 Mutation
  const testMutation = useSimpleMutation<unknown, Error, ApiTest>(
    async (test: ApiTest) => {
      const config = test.skipAuth ? { skipAuth: true as const } : {}

      switch (test.method) {
        case 'get':
          return await api.get(test.url, config)
        case 'post':
          return await api.post(test.url, test.body || {}, config)
        case 'put':
          return await api.put(test.url, test.body || {}, config)
        case 'patch':
          return await api.patch(test.url, test.body || {}, config)
        case 'delete':
          return await api.delete(test.url, config)
      }
    },
    {
      onSuccess: (data, variables) => {
        console.log('성공:', variables.name)
        console.log('Response:', data)
      },
      onError: (error) => {
        // variables가 undefined일 수 있으므로 optional chaining 사용
        console.error(`실패`)
        console.error('Error:', error)
      },
    }
  )

  const selectedTest = API_TESTS.find((t) => t.id === selectedId)

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* 제목 */}
      <div>
        <h1 className="text-2xl font-bold">API 테스트</h1>
        <p className="mt-1 text-sm text-gray-600">
          F12 → Network 탭에서 요청 확인
        </p>
      </div>

      {/* 현재 상태 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">현재 상태</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">accessToken:</span>{' '}
            <span className="font-mono text-xs break-all">
              {accessToken || '없음'}
            </span>
          </p>
          <p className="mb-4">
            <span className="font-medium">user:</span>{' '}
            <span className="font-mono text-xs">
              {user ? user.nickname : '없음'}
            </span>
          </p>
        </div>
        <Button variant="primary" onClick={handleMockLogin} size="freeWidthMd">
          더미 로그인 (테스트용)
        </Button>
      </div>

      {/* API 선택 */}
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 font-semibold">API 선택</h3>
        <div className="grid grid-cols-2 gap-2">
          {API_TESTS.map((test) => (
            <button
              key={test.id}
              onClick={() => setSelectedId(test.id)}
              className={`rounded-lg border p-3 text-left transition-all ${
                selectedId === test.id
                  ? 'border-primary-500 bg-primary-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium">{test.name}</div>
              <div className="mt-1 text-xs text-gray-500">
                <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">
                  {test.method.toUpperCase()}
                </span>{' '}
                {test.url}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 api 상세 */}
      {selectedTest && (
        <div className="space-y-3 rounded-lg border bg-white p-4">
          <h3 className="font-semibold">{selectedTest.name}</h3>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Method:</span>{' '}
              <span className="font-mono">
                {selectedTest.method.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-medium">URL:</span>{' '}
              <span className="font-mono text-xs">{selectedTest.url}</span>
            </div>
            {selectedTest.body && (
              <div>
                <span className="font-medium">Body:</span>
                <pre className="mt-1 overflow-x-auto rounded bg-gray-50 p-2 font-mono text-xs">
                  {JSON.stringify(selectedTest.body, null, 2)}
                </pre>
              </div>
            )}
            <div>
              <span className="font-medium">Authorization:</span>{' '}
              <span
                className={
                  selectedTest.skipAuth ? 'text-danger-600' : 'text-success-600'
                }
              >
                {selectedTest.skipAuth ? '없음' : 'Bearer 토큰 포함'}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => testMutation.mutate(selectedTest)}
            size="freeWidthMd"
            disabled={testMutation.isPending}
          >
            {testMutation.isPending ? '실행중..' : '실행하기'}
          </Button>
        </div>
      )}

      {/* 안내 */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-2 text-sm font-semibold">확인 방법</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
          <li>더미 로그인으로 토큰 생성</li>
          <li>테스트할 API 선택</li>
          <li>실행하기 버튼 클릭</li>
          <li>
            <span className="font-medium">F12 → Network 탭</span>에서 요청 확인
          </li>
          <li>
            <span className="font-medium">Headers</span>에서 Authorization 확인
          </li>
          <li>
            <span className="font-medium">Payload</span>에서 요청 값 확인
          </li>
        </ol>
      </div>

      {/* API 추가 가이드 */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 text-sm font-semibold">API 추가 방법</h3>
        <pre className="text-success-500 overflow-x-auto rounded-md bg-black p-3 text-xs">
          {`// API_TESTS 배열에 추가
{
  id: 'my-api',
  name: '내 API 이름',
  method: 'post',
  url: '/v1/my/endpoint',
  body: { key: 'value' },
  skipAuth: false // 토큰 필요시 false
}`}
        </pre>
      </div>
    </div>
  )
}
