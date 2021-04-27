import {gql} from '@apollo/client';

export const REGISTER = gql`
  mutation CreateEmployee(
    $username: String!
    $password: String!
    $email: String!
    $name: String!
    $occupation: String!
    $occupationDescription: String!
    $address: String!
    $isManagement: Boolean
    $workspaceId: Int!
  ) {
    createEmployee(
      username: $username
      password: $password
      email: $email
      name: $name
      occupation: $occupation
      occupationDescription: $occupationDescription
      address: $address
      isManagement: $isManagement
      workspaceId: $workspaceId
    ) {
      employee {
        id
        name
        isManagement
        occupation
        occupationDescription
        address
        isManagement
        status
        workspace {
          id
          name
        }
        user {
          username
          email
        }
      }
      token
    }
  }
`;
export const LOGIN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
export const AUTHENTICATE_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      payload
      refreshExpiresIn
    }
  }
`;
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $employeeId: Int!
    $name: String!
    $occupation: String!
    $occupationDescription: String!
    $status: String
    $address: String!
    $isManagement: Boolean
    $workspaceId: Int
  ) {
    updateEmployee(
      employeeId: $employeeId
      name: $name
      occupation: $occupation
      occupationDescription: $occupationDescription
      status: $status
      address: $address
      isManagement: $isManagement
      workspaceId: $workspaceId
    ) {
      employee {
        id
        name
        occupation
        occupationDescription
        status
        address
        isManagement
        workspace{
          id
          name
        }
      }
    }
  }
`;
