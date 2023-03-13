import { SidebarElement } from './types/sidebar'
import { createBrowserRouter } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import GeneralLayout from './layout/GeneralLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import PageA from './pages/PageA'
import PageB from './pages/PageB'
import PageC from './pages/PageC'

interface RouterElement {
  id: number // 페이지 아이디 (반복문용 고유값)
  path: string // 페이지 경로
  label: string // 사이드바에 표시할 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
  withAuth?: boolean // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
  // TODO 3-1: 로그인 페이지 라우터 등록하기 ('login', withAuth: false)
  // TODO 3-2: page a, b, c 등록하기
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    withAuth: false,
  },
  {
    id: 2,
    path: '/pageA',
    label: 'pageA',
    element: <PageA />,
    withAuth: true,
  },
  {
    id: 3,
    path: '/pageB',
    label: 'pageB',
    element: <PageB />,
    withAuth: true,
  },
  {
    id: 4,
    path: '/pageC',
    label: 'pageC',
    element: <PageC />,
    withAuth: true,
  }
]

// TODO 3-1: 인증이 필요한 페이지는 GeneralLayout으로 감싸서 라우터에 전달
// GeneralLayout에는 페이지 컴포넌트를 children으로 전달
export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router:RouterElement)=>{
    if(router.withAuth){
      return {
        path : router.path,
        element:<GeneralLayout>{router.element}</GeneralLayout>
      }
    } else {
      return {
        path: router.path,
        element:router.element
      }
    }
  })
)

// TODO 3-2: 라우터 객체에서 인증이 필요한 페이지만 필터링해 사이드바에 전달
// id, path, label을 전달하여 Sidebar에서 사용
export const SidebarContent: SidebarElement[] = routerData.reduce((prev:SidebarElement[] , router:RouterElement)=>{
  if(!router.withAuth) return prev

  return [
    ...prev,
    {
      id:router.id,
      path:router.path,
      label:router.label
    }
  ]
} , [] as SidebarElement[])
