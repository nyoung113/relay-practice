import { graphql, useFragment } from 'react-relay'
import { SearchResultItem_fragment$key } from '../__generated__/SearchResultItem_fragment.graphql'

/*
module Review = {
  module Fragment = %relay(`
    fragment ShopsPageShopListItemScore_Review_Fragment on RepairShopStats {
      reviewRecentCount
      reviewRecentAverageScore
    }
  `)

  @react.component
  let make = (~queryRef) => {
    let {reviewRecentCount, reviewRecentAverageScore} = queryRef->Fragment.use

    <div className="flex items-center space-x-0.5">
      <Svg.Graphic name={#"ico-star-full"} className="w-3 h-3" />
      <span className="text-sm font-bold"> {reviewRecentAverageScore->React.float} </span>
      <span className="text-sm text-gray-600">
        {`(${reviewRecentCount->Int.toString})`->React.string}
      </span>
    </div>
  }
}

module Case = {
  module Fragment = %relay(`
    fragment ShopsPageShopListItemScore_Case_Fragment on RepairShopStats {
      caseCount
    }
  `)

  @react.component
  let make = (~queryRef) => {
    let {caseCount} = queryRef->Fragment.use

    <div className="flex items-center space-x-0.5 text-gray-600">
      <span> {"수리사례"->React.string} </span>
      <span> {`(${caseCount->Int.toString})`->React.string} </span>
    </div>
  }
}

module Fragment = %relay(`
  fragment ShopsPageShopListItemScore_Fragment on RepairShopStats {
    ...ShopsPageShopListItemScore_Review_Fragment
    ...ShopsPageShopListItemScore_Case_Fragment
    reviewRecentCount
    caseCount
  }
`)

@react.component
let make = (~queryRef) => {
  let {reviewRecentCount, caseCount, fragmentRefs} = queryRef->Fragment.use

  switch (reviewRecentCount > 4, caseCount > 0) {
  | (true, true) =>
    <div className="flex items-center space-x-1 whitespace-nowrap">
      <Review queryRef=fragmentRefs />
      <span className="text-blue-gray-300"> {"·"->React.string} </span>
      <Case queryRef=fragmentRefs />
    </div>

  | (true, false) =>
    <div className="flex items-center space-x-1 whitespace-nowrap">
      <Review queryRef=fragmentRefs />
    </div>

  | (false, true) =>
    <div className="flex items-center space-x-1 whitespace-nowrap">
      <Case queryRef=fragmentRefs />
    </div>

  | (false, false) => React.null
  }
}


*/

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
