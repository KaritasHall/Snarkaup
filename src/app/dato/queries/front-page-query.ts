import { gql } from "@apollo/client";
import { ImageFragment } from "./image-fragment";

export const GET_FRONT_PAGE = gql`
  query FrontPageQuery {
    frontPage {
      contentSection {
        infoBlock {
          buttonLink {
            ... on ExternalLinkRecord {
              id
              linkTitle
              linkUrl
            }
            ... on InternalLinkRecord {
              linkTitle
              linkUrl
              id
            }
          }
          description
          heading
          id
          image {
            ...ImageFragment
          }
        }
        id
      }
    }
  }
  ${ImageFragment}
`;
