import { graphql, useFragment } from 'react-relay'
import { SearchResultItem_fragment$key } from '../../__generated__/SearchResultItem_fragment.graphql'
import StarField from './StarField'

const Fragment = graphql`
    fragment SearchResultItem_fragment on Repository {
        id
        primaryLanguage {
            color
            name
        }
        owner {
            avatarUrl
        }
        nameWithOwner
        description
        url
        pushedAt
        ...StarField_fragment
    }
`

type Props = {
    fragmentRef: SearchResultItem_fragment$key
}

export const SearchResultItem: React.FC<Props> = ({ fragmentRef }) => {
    const data = useFragment(Fragment, fragmentRef)
    return (
        <li className="odd:bg-[#dfdfdf] window p-4">
            <div className="">
                <img src={data.owner.avatarUrl} className="w-10 h-10" />
                <a href={data.url} target="_blank">
                    {data.nameWithOwner}
                </a>
            </div>
            <div>{data.description}</div>
            <div className="status-bar">
                <div
                    className="status-bar-field w-[20px]"
                    style={{
                        color: data.primaryLanguage?.color ?? 'black',
                    }}
                >
                    {data.primaryLanguage?.name}
                </div>
                <StarField fragmentRef={data} />
                <div className="status-bar-field">{data.pushedAt}</div>
            </div>
        </li>
    )
}

export default SearchResultItem
