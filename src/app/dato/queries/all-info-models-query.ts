import { gql } from "@apollo/client";
import { ImageFragment } from "./image-fragment";

export const GET_ALL_INFO_SECTIONS = gql`
  query AllInfoSectionsQuery {
    allInfoSections {
      buttonLink {
        ... on ExternalLinkRecord {
          id
          linkTitle
          linkUrl
        }
        ... on InternalLinkRecord {
          id
          linkTitle
          linkUrl
        }
      }
      description
      heading
      id
      image {
        ...ImageFragment
      }
    }
  }
  ${ImageFragment}
`;
