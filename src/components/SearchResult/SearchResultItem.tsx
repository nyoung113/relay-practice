import { graphql, useFragment } from 'react-relay'
import { SearchResultItem_fragment$key } from '../../__generated__/SearchResultItem_fragment.graphql'

const Fragment = graphql`
    fragment SearchResultItem_fragment on Repository {
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
        stargazerCount
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
                    className="status-bar-field"
                    style={{
                        color: data.primaryLanguage?.color ?? 'black',
                    }}
                >
                    {data.primaryLanguage?.name}
                </div>
                <div className="status-bar-field">{data.stargazerCount}</div>
                <div className="status-bar-field">{data.pushedAt}</div>
            </div>
        </li>
    )
}

export default SearchResultItem
