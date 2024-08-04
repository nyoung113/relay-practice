import { graphql, useLazyLoadQuery } from 'react-relay'
import SearchSection from './SearchSection'
import { HomePageQuery } from '../__generated__/HomePageQuery.graphql'
import Viewer from './Viewer'
import { Suspense } from 'react'

const Query = graphql`
    query HomePageQuery($keyword: String!, $count: Int, $cursor: String) {
        viewer {
            ...Viewer_fragment
        }
        ...SearchResult_fragment
    }
`

const HomePage = () => {
    const data = useLazyLoadQuery<HomePageQuery>(Query, {
        keyword: '',
        count: 10,
        // NOTE: 처음이라 cursor는 생략
    })

    return (
        <div className="w-full min-h-screen h-full bg-main">
            <h3>Home</h3>
            <Viewer viewer={data.viewer} />
            <SearchSection fragmentRef={data} />
        </div>
    )
}

export default HomePage
