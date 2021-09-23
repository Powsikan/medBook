/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      doctorName
      serviceType
      serviceCharge
      status
      slots {
        available
        to
        from
      }
      AvailableTimes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        doctorName
        serviceType
        serviceCharge
        status
        slots {
          available
          to
          from
        }
        AvailableTimes
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      refNo
      userId
      serviceId
      serviceName
      date
      slot {
        available
        to
        from
      }
      bookingCharge
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        refNo
        userId
        serviceId
        serviceName
        date
        slot {
          available
          to
          from
        }
        bookingCharge
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      fullName
      gender
      phone_number
      active
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        fullName
        gender
        phone_number
        active
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
