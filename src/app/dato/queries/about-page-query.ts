import { gql } from "@apollo/client";
import { ImageFragment } from "./image-fragment";

export const GET_ABOUT_PAGE = gql`
  query AboutQuery {
    about {
      heading
      hero {
        ...ImageFragment
      }
      description
      embedInfoSection {
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
  }
  ${ImageFragment}
`;
