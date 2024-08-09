import { graphql, useFragment, useMutation } from 'react-relay'
import StarredStarSvg from '../../assets/starred.svg?react'
import UnStarredStarSvg from '../../assets/unstarred.svg?react'
import { StarFieldAddMutation } from '../../__generated__/StarFieldAddMutation.graphql'
import {
    StarField_fragment$data,
    StarField_fragment$key,
} from '../../__generated__/StarField_fragment.graphql'

const addStarMutation = graphql`
    mutation StarFieldAddMutation($input: AddStarInput!) @raw_response_type {
        addStar(input: $input) {
            starrable {
                stargazerCount
                viewerHasStarred
            }
        }
    }
`

const removeStarMutation = graphql`
    mutation StarFieldemoveMutation($input: RemoveStarInput!) {
        removeStar(input: $input) {
            starrable {
                stargazerCount
                viewerHasStarred
            }
        }
    }
`

// NOTE: optimistic UI Props
type UnStarredStarProps = {
    data: StarField_fragment$data
}

const UnStarredStar: React.FC<UnStarredStarProps> = ({ data }) => {
    const [addStar] = useMutation<StarFieldAddMutation>(addStarMutation)

    const handleAddStarButtonClick = () => {
        addStar({
            variables: {
                input: {
                    starrableId: data.id,
                },
            },
            optimisticResponse: {
                addStar: {
                    starrable: {
                        ...data,
                        stargazerCount: data.stargazerCount + 1,
                        viewerHasStarred: true,
                    },
                },
            },
        })
    }

    return (
        <UnStarredStarSvg
            className="cursor-pointer"
            onClick={handleAddStarButtonClick}
        />
    )
}

// NOTE: non optimistic UI Props
type StarredStarProps = {
    id: string
}

const StarredStar: React.FC<StarredStarProps> = ({ id }) => {
    const [removeStar] = useMutation<StarFieldAddMutation>(removeStarMutation)
    const handleRemoveStarButtonClick = () => {
        removeStar({
            variables: {
                input: {
                    starrableId: id,
                },
            },
        })
    }

    return (
        <StarredStarSvg
            className="cursor-pointer"
            onClick={handleRemoveStarButtonClick}
        />
    )
}

type Props = {
    fragmentRef: StarField_fragment$key
}

const fragment = graphql`
    # 여기 다 써줘야 하는건가.?
    fragment StarField_fragment on Starrable {
        __typename
        id
        stargazerCount
        viewerHasStarred
    }
`

const StarField: React.FC<Props> = ({ fragmentRef }) => {
    const data = useFragment(fragment, fragmentRef)

    return (
        <div className="flex status-bar-field items-center gap-1">
            {data.viewerHasStarred ? (
                <StarredStar id={data.id} />
            ) : (
                <UnStarredStar data={data} />
            )}
            <div>{data.stargazerCount}</div>
        </div>
    )
}

export default StarField
