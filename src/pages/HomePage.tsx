import { graphql, useLazyLoadQuery } from 'react-relay'
import { HomePageQuery } from '../__generated__/HomePageQuery.graphql'

import Viewer from '../components/Viewer'

const Query = graphql`
    query HomePageQuery {
        viewer {
            ...Viewer_fragment
        }
    }
`

const HomePage = () => {
    const data = useLazyLoadQuery<HomePageQuery>(Query, {})

    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center bg-[#377e7f] py-10">
            <Viewer viewer={data.viewer} />
        </div>
    )
}

export default HomePage
