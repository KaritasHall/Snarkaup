import { gql } from "@apollo/client";

export const GET_ABOUT_PAGE = gql`
  query AboutQuery {
    about {
      heading
      hero {
        __typename
        id
        alt
        author
        basename
        blurUpThumb
        blurhash
        colors {
          __typename
          alpha
          blue
          cssRgb
          green
          hex
          red
        }
        filename
        focalPoint {
          __typename
          x
          y
        }
        format
        height
        md5
        mimeType
        responsiveImage {
          __typename
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
        size
        smartTags
        tags
        thumbhash
        title
        url
        width
      }
      description
    }
  }
`;
