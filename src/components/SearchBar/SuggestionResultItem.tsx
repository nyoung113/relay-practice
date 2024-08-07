import { graphql, useFragment } from 'react-relay'
import { SuggestionResultItem_fragment$key } from '../../__generated__/SuggestionResultItem_fragment.graphql'

const ItemFragment = graphql`
    fragment SuggestionResultItem_fragment on Repository {
        nameWithOwner
        url
    }
`
type ItemProps = {
    fragmentRef: SuggestionResultItem_fragment$key
}

const SuggestionResultItem: React.FC<ItemProps> = ({ fragmentRef }) => {
    const { nameWithOwner, url } = useFragment(ItemFragment, fragmentRef)
    return (
        <a href={url}>
            <p className="truncate">{nameWithOwner}</p>
        </a>
    )
}

export default SuggestionResultItem
