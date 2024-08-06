import { useFragment } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { Viewer_fragment$key } from '../__generated__/Viewer_fragment.graphql'

const Fragment = graphql`
    fragment Viewer_fragment on User {
        login
        email
    }
`

type props = {
    viewer: Viewer_fragment$key
}

const Viewer = ({ viewer }: props) => {
    const data = useFragment(Fragment, viewer)

    return (
        <div className="window w-1/2 flex justify-center">
            <div className="window-body">user: {data.login}</div>
        </div>
    )
}

export default Viewer
