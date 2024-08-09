import { useFragment } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { Viewer_fragment$key } from '../__generated__/Viewer_fragment.graphql'

const Fragment = graphql`
    fragment Viewer_fragment on User {
        id
        login
        email
        avatarUrl
    }
`

type props = {
    viewer: Viewer_fragment$key
}

const Viewer = ({ viewer }: props) => {
    const data = useFragment(Fragment, viewer)

    return (
        <div>
            <span className="">user: {data.login}</span>
        </div>
    )
}

export default Viewer
