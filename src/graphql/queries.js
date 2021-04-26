import {gql} from '@apollo/client';

export const ME = gql`
  query {
    me {
      employee {
        name
        id
        occupation
        occupationDescription
        isManagement
        status
        address
        workspace {
          name
          id
        }
      }
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query {
    employees {
      user {
        username
        email
      }
      id
      name
      isManagement
      status
      occupation
      occupationDescription
      address
      workspace {
        name
        id
      }
    }
  }
`;

export const GET_ALL_WORKSPACES = gql`
  query{
    workspaces{
      id
      name
      address
      description
    }
  }
`