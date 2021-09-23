/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
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
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
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
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
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
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
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
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
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
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
