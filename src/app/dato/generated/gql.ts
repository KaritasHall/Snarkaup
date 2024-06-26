/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query AboutQuery {\n    about {\n      heading\n      hero {\n        ...ImageFragment\n      }\n      description\n      embedInfoSection {\n        buttonLink {\n          ... on ExternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n          ... on InternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n        }\n        description\n        heading\n        id\n        image {\n          ...ImageFragment\n        }\n      }\n    }\n  }\n  \n": types.AboutQueryDocument,
    "\n  query AllInfoSectionsQuery {\n    allInfoSections {\n      buttonLink {\n        ... on ExternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n        ... on InternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n      }\n      description\n      heading\n      id\n      image {\n        ...ImageFragment\n      }\n    }\n  }\n  \n": types.AllInfoSectionsQueryDocument,
    "\n  query FrontPageQuery {\n    frontPage {\n      contentSection {\n        infoBlock {\n          buttonLink {\n            ... on ExternalLinkRecord {\n              id\n              linkTitle\n              linkUrl\n            }\n            ... on InternalLinkRecord {\n              linkTitle\n              linkUrl\n              id\n            }\n          }\n          description\n          heading\n          id\n          image {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  \n": types.FrontPageQueryDocument,
    "\n  fragment ImageFragment on FileField {\n    __typename\n    id\n    alt\n    author\n    basename\n    blurUpThumb\n    blurhash\n    colors {\n      __typename\n      alpha\n      blue\n      cssRgb\n      green\n      hex\n      red\n    }\n    filename\n    focalPoint {\n      __typename\n      x\n      y\n    }\n    format\n    height\n    md5\n    mimeType\n    responsiveImage {\n      __typename\n      alt\n      aspectRatio\n      base64\n      bgColor\n      height\n      sizes\n      src\n      srcSet\n      title\n      webpSrcSet\n      width\n    }\n    size\n    smartTags\n    tags\n    thumbhash\n    title\n    url\n    width\n  }\n": types.ImageFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AboutQuery {\n    about {\n      heading\n      hero {\n        ...ImageFragment\n      }\n      description\n      embedInfoSection {\n        buttonLink {\n          ... on ExternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n          ... on InternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n        }\n        description\n        heading\n        id\n        image {\n          ...ImageFragment\n        }\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query AboutQuery {\n    about {\n      heading\n      hero {\n        ...ImageFragment\n      }\n      description\n      embedInfoSection {\n        buttonLink {\n          ... on ExternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n          ... on InternalLinkRecord {\n            id\n            linkTitle\n            linkUrl\n          }\n        }\n        description\n        heading\n        id\n        image {\n          ...ImageFragment\n        }\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllInfoSectionsQuery {\n    allInfoSections {\n      buttonLink {\n        ... on ExternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n        ... on InternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n      }\n      description\n      heading\n      id\n      image {\n        ...ImageFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query AllInfoSectionsQuery {\n    allInfoSections {\n      buttonLink {\n        ... on ExternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n        ... on InternalLinkRecord {\n          id\n          linkTitle\n          linkUrl\n        }\n      }\n      description\n      heading\n      id\n      image {\n        ...ImageFragment\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FrontPageQuery {\n    frontPage {\n      contentSection {\n        infoBlock {\n          buttonLink {\n            ... on ExternalLinkRecord {\n              id\n              linkTitle\n              linkUrl\n            }\n            ... on InternalLinkRecord {\n              linkTitle\n              linkUrl\n              id\n            }\n          }\n          description\n          heading\n          id\n          image {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query FrontPageQuery {\n    frontPage {\n      contentSection {\n        infoBlock {\n          buttonLink {\n            ... on ExternalLinkRecord {\n              id\n              linkTitle\n              linkUrl\n            }\n            ... on InternalLinkRecord {\n              linkTitle\n              linkUrl\n              id\n            }\n          }\n          description\n          heading\n          id\n          image {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ImageFragment on FileField {\n    __typename\n    id\n    alt\n    author\n    basename\n    blurUpThumb\n    blurhash\n    colors {\n      __typename\n      alpha\n      blue\n      cssRgb\n      green\n      hex\n      red\n    }\n    filename\n    focalPoint {\n      __typename\n      x\n      y\n    }\n    format\n    height\n    md5\n    mimeType\n    responsiveImage {\n      __typename\n      alt\n      aspectRatio\n      base64\n      bgColor\n      height\n      sizes\n      src\n      srcSet\n      title\n      webpSrcSet\n      width\n    }\n    size\n    smartTags\n    tags\n    thumbhash\n    title\n    url\n    width\n  }\n"): (typeof documents)["\n  fragment ImageFragment on FileField {\n    __typename\n    id\n    alt\n    author\n    basename\n    blurUpThumb\n    blurhash\n    colors {\n      __typename\n      alpha\n      blue\n      cssRgb\n      green\n      hex\n      red\n    }\n    filename\n    focalPoint {\n      __typename\n      x\n      y\n    }\n    format\n    height\n    md5\n    mimeType\n    responsiveImage {\n      __typename\n      alt\n      aspectRatio\n      base64\n      bgColor\n      height\n      sizes\n      src\n      srcSet\n      title\n      webpSrcSet\n      width\n    }\n    size\n    smartTags\n    tags\n    thumbhash\n    title\n    url\n    width\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;