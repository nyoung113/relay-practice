import { graphql, useLazyLoadQuery } from 'react-relay'
import SearchSection from './SearchSection'
import { HomePageQuery } from '../__generated__/HomePageQuery.graphql'
import Viewer from './Viewer'

const Query = graphql`
    query HomePageQuery(
        $keyword: String!
        $suggestionKeyword: String!
        $count: Int
        $cursor: String
    ) {
        viewer {
            ...Viewer_fragment
        }
        ...SearchSection_fragment
        ...SearchBar_fragment
    }
`

const HomePage = () => {
    const data = useLazyLoadQuery<HomePageQuery>(Query, {
        suggestionKeyword: '',
        keyword: '',
        count: 10,
        // NOTE: 처음이라 cursor는 생략
    })

    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center bg-[#377e7f] py-10">
            <h3>Home</h3>
            <Viewer viewer={data.viewer} />
            <SearchSection
                searchSectionRef={data}
                searchBarFragmentRef={data}
            />
        </div>
    )
}

export default HomePage
