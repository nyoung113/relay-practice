import { graphql, useLazyLoadQuery } from 'react-relay'

import Viewer from '../components/Viewer'
import { Link } from 'react-router-dom'
import { UserPageQuery } from '../__generated__/UserPageQuery.graphql'

const Query = graphql`
    query UserPageQuery {
        viewer {
            ...Viewer_fragment
        }
    }
`

const HomePage = () => {
    const data = useLazyLoadQuery<UserPageQuery>(Query, {})
    return (
        <div className="flex flex-col items-center py-10">
            <Link to={'/search'}>
                <button> click to search</button>
            </Link>
            <Viewer viewer={data.viewer} />
        </div>
    )
}

export default HomePage
