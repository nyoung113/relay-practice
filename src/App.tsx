import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { RelayEnvironment } from './RelayEnvironment'
import { Suspense } from 'react'
import HomePage from './components/HomePage'

const App = () => (
    // 정규화해서 map 형태로 데이터 불러와서 map의 key로 접근하게 만들어줌
    // provider가 map data
    // error boundary
    <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={'Loading...'}>
            <HomePage />
        </Suspense>
    </RelayEnvironmentProvider>
)

export default App
