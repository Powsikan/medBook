/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateService = /* GraphQL */ `
  subscription OnCreateService {
    onCreateService {
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
      AvailableTimes {
        date
        slots {
          available
          to
          from
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService {
    onUpdateService {
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
      AvailableTimes {
        date
        slots {
          available
          to
          from
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService {
    onDeleteService {
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
      AvailableTimes {
        date
        slots {
          available
          to
          from
        }
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking {
    onCreateBooking {
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
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking {
    onUpdateBooking {
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
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking {
    onDeleteBooking {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
