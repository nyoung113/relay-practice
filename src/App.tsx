import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { RelayEnvironment } from './RelayEnvironment'
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PageLoading from './components/PageLoading'
import SearchPage from './pages/SearchPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/search',
        element: <SearchPage />,
    },
])

const App = () => (
    // 정규화해서 map 형태로 데이터 불러와서 map의 key로 접근하게 만들어줌
    // provider가 map data
    // error boundary도 필요..
    <RelayEnvironmentProvider environment={RelayEnvironment}>
        <div className="w-full min-h-screen h-full items-center bg-[#377e7f]">
            <Suspense fallback={<PageLoading />}>
                <RouterProvider router={router} />
            </Suspense>
        </div>
    </RelayEnvironmentProvider>
)

export default App
