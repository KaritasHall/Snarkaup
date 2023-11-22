import { gql } from "@apollo/client";

export const GET_FRONT_PAGE = gql`
  query getFrontPage {
    frontpage {
      heroTitle
      heroDescription {
        blocks
        links
        value
      }
      heroImage {
        url
      }
      heroCta {
        linkTitle
        linkUrl
      }
    }
  }
`;
