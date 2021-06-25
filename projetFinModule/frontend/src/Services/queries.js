import {gql} from '@apollo/client'

export const GET_NEWS = gql`
  query GetNews {
    news {
        news
        source
        label
    }
  }
`;


export const GET_EMOTIONS = gql`
  query GetEmotions {
    emotions {
        text
        source
        label
    }
  }
`;