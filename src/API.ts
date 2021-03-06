/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateServiceInput = {
  id?: string | null,
  doctorName: string,
  serviceType?: string | null,
  serviceCharge: number,
  status: boolean,
  slots?: Array< AvailableTimeSlotInput | null > | null,
  AvailableTimes?: Array< AvailableTimeInput | null > | null,
};

export type AvailableTimeSlotInput = {
  available?: boolean | null,
  to?: string | null,
  from?: string | null,
};

export type AvailableTimeInput = {
  date?: string | null,
  slots?: Array< AvailableTimeSlotInput | null > | null,
};

export type ModelServiceConditionInput = {
  doctorName?: ModelStringInput | null,
  serviceType?: ModelStringInput | null,
  serviceCharge?: ModelFloatInput | null,
  status?: ModelBooleanInput | null,
  and?: Array< ModelServiceConditionInput | null > | null,
  or?: Array< ModelServiceConditionInput | null > | null,
  not?: ModelServiceConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Service = {
  __typename: "Service",
  id: string,
  doctorName: string,
  serviceType?: string | null,
  serviceCharge: number,
  status: boolean,
  slots?:  Array<AvailableTimeSlot | null > | null,
  AvailableTimes?:  Array<AvailableTime | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type AvailableTimeSlot = {
  __typename: "AvailableTimeSlot",
  available?: boolean | null,
  to?: string | null,
  from?: string | null,
};

export type AvailableTime = {
  __typename: "AvailableTime",
  date?: string | null,
  slots?:  Array<AvailableTimeSlot | null > | null,
};

export type UpdateServiceInput = {
  id: string,
  doctorName?: string | null,
  serviceType?: string | null,
  serviceCharge?: number | null,
  status?: boolean | null,
  slots?: Array< AvailableTimeSlotInput | null > | null,
  AvailableTimes?: Array< AvailableTimeInput | null > | null,
};

export type DeleteServiceInput = {
  id: string,
};

export type CreateBookingInput = {
  id?: string | null,
  refNo?: string | null,
  userId: string,
  serviceId: string,
  serviceName: string,
  date: string,
  slot: AvailableTimeSlotInput,
  bookingCharge: number,
  status: string,
};

export type ModelBookingConditionInput = {
  refNo?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  serviceId?: ModelIDInput | null,
  serviceName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  bookingCharge?: ModelFloatInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelBookingConditionInput | null > | null,
  or?: Array< ModelBookingConditionInput | null > | null,
  not?: ModelBookingConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Booking = {
  __typename: "Booking",
  id: string,
  refNo?: string | null,
  userId: string,
  serviceId: string,
  serviceName: string,
  date: string,
  slot: AvailableTimeSlot,
  bookingCharge: number,
  status: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateBookingInput = {
  id: string,
  refNo?: string | null,
  userId?: string | null,
  serviceId?: string | null,
  serviceName?: string | null,
  date?: string | null,
  slot?: AvailableTimeSlotInput | null,
  bookingCharge?: number | null,
  status?: string | null,
};

export type DeleteBookingInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email?: string | null,
  fullName?: string | null,
  gender?: string | null,
  phone_number?: string | null,
  active?: boolean | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email?: string | null,
  fullName?: string | null,
  gender?: string | null,
  phone_number?: string | null,
  active?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  fullName?: string | null,
  gender?: string | null,
  phone_number?: string | null,
  active?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelServiceFilterInput = {
  id?: ModelIDInput | null,
  doctorName?: ModelStringInput | null,
  serviceType?: ModelStringInput | null,
  serviceCharge?: ModelFloatInput | null,
  status?: ModelBooleanInput | null,
  and?: Array< ModelServiceFilterInput | null > | null,
  or?: Array< ModelServiceFilterInput | null > | null,
  not?: ModelServiceFilterInput | null,
};

export type ModelServiceConnection = {
  __typename: "ModelServiceConnection",
  items?:  Array<Service | null > | null,
  nextToken?: string | null,
};

export type ModelBookingFilterInput = {
  id?: ModelIDInput | null,
  refNo?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  serviceId?: ModelIDInput | null,
  serviceName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  bookingCharge?: ModelFloatInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelBookingFilterInput | null > | null,
  or?: Array< ModelBookingFilterInput | null > | null,
  not?: ModelBookingFilterInput | null,
};

export type ModelBookingConnection = {
  __typename: "ModelBookingConnection",
  items?:  Array<Booking | null > | null,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type CreateServiceMutation = {
  createService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateServiceMutationVariables = {
  input: UpdateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type UpdateServiceMutation = {
  updateService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteServiceMutationVariables = {
  input: DeleteServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type DeleteServiceMutation = {
  deleteService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateBookingMutationVariables = {
  input: CreateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type CreateBookingMutation = {
  createBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateBookingMutationVariables = {
  input: UpdateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type UpdateBookingMutation = {
  updateBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteBookingMutationVariables = {
  input: DeleteBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type DeleteBookingMutation = {
  deleteBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetServiceQueryVariables = {
  id: string,
};

export type GetServiceQuery = {
  getService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListServicesQueryVariables = {
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListServicesQuery = {
  listServices?:  {
    __typename: "ModelServiceConnection",
    items?:  Array< {
      __typename: "Service",
      id: string,
      doctorName: string,
      serviceType?: string | null,
      serviceCharge: number,
      status: boolean,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
      AvailableTimes?:  Array< {
        __typename: "AvailableTime",
        date?: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetBookingQueryVariables = {
  id: string,
};

export type GetBookingQuery = {
  getBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListBookingsQueryVariables = {
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBookingsQuery = {
  listBookings?:  {
    __typename: "ModelBookingConnection",
    items?:  Array< {
      __typename: "Booking",
      id: string,
      refNo?: string | null,
      userId: string,
      serviceId: string,
      serviceName: string,
      date: string,
      slot:  {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      },
      bookingCharge: number,
      status: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email?: string | null,
      fullName?: string | null,
      gender?: string | null,
      phone_number?: string | null,
      active?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateServiceSubscription = {
  onCreateService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateServiceSubscription = {
  onUpdateService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteServiceSubscription = {
  onDeleteService?:  {
    __typename: "Service",
    id: string,
    doctorName: string,
    serviceType?: string | null,
    serviceCharge: number,
    status: boolean,
    slots?:  Array< {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    } | null > | null,
    AvailableTimes?:  Array< {
      __typename: "AvailableTime",
      date?: string | null,
      slots?:  Array< {
        __typename: "AvailableTimeSlot",
        available?: boolean | null,
        to?: string | null,
        from?: string | null,
      } | null > | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateBookingSubscription = {
  onCreateBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateBookingSubscription = {
  onUpdateBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteBookingSubscription = {
  onDeleteBooking?:  {
    __typename: "Booking",
    id: string,
    refNo?: string | null,
    userId: string,
    serviceId: string,
    serviceName: string,
    date: string,
    slot:  {
      __typename: "AvailableTimeSlot",
      available?: boolean | null,
      to?: string | null,
      from?: string | null,
    },
    bookingCharge: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    fullName?: string | null,
    gender?: string | null,
    phone_number?: string | null,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
