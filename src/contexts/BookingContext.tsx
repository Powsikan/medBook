/* eslint-disable prettier/prettier */
import {
  Booking,
  CreateBookingInput,
  CreateBookingMutation,
  DeleteBookingMutation,
  GetBookingQuery,
  ListBookingsQuery,
  ListBookingsQueryVariables,
  UpdateBookingInput,
  UpdateBookingMutation,
} from '../API';
import React, {createContext, FC, ReactNode, useState} from 'react';
import {GraphQLAPI} from '@aws-amplify/api-graphql';
import {getBooking, listBookings} from '../graphql/queries';
import {
  createBooking,
  deleteBooking,
  updateBooking,
} from '../graphql/mutations';
import prepareForUpdate from '../utils/prepareForUpdate';

type BookingContextType = {
  onGetBookings: (variables: ListBookingsQueryVariables) => Promise<{
    bookings: Booking[];
    nextToken: string | null | undefined;
  }>;
  onGetBooking: (id: string) => Promise<Booking>;
  onCreateBooking: (createBookingInput: CreateBookingInput) => Promise<Booking>;
  onUpdateBooking: (updateBookingInput: UpdateBookingInput) => Promise<Booking>;
  onDeleteBooking: (id: string) => Promise<string | undefined>;
  isLoading: boolean;
};

export const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType,
);

const BookingProvider: FC<ReactNode> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGetBookings = async (
    variables: ListBookingsQueryVariables,
  ): Promise<{
    bookings: Booking[];
    nextToken: string | null | undefined;
  }> => {
    try {
      const _listBookings = (await GraphQLAPI.graphql({
        query: listBookings,
        variables,
      })) as {data: ListBookingsQuery};
      const bookings = _listBookings.data.listBookings?.items as Booking[];
      return {
        bookings,
        nextToken: _listBookings.data.listBookings?.nextToken,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onGetBooking = async (id: string): Promise<Booking> => {
    try {
      const _booking = (await GraphQLAPI.graphql({
        query: getBooking,
        variables: {id: id},
      })) as {data: GetBookingQuery};
      return _booking.data.getBooking as Booking;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onCreateBooking = async (
    createBookingInput: CreateBookingInput,
  ): Promise<Booking> => {
    setIsLoading(true);
    try {
      const newBooking = (await GraphQLAPI.graphql({
        query: createBooking,
        variables: {input: createBookingInput},
      })) as {data: CreateBookingMutation};
      setIsLoading(false);
      return newBooking.data.createBooking as Booking;
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      throw e;
    }
  };

  const onUpdateBooking = async (
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> => {
    setIsLoading(true);
    try {
      prepareForUpdate(updateBookingInput);
      const _booking = (await GraphQLAPI.graphql({
        query: updateBooking,
        variables: {input: updateBookingInput},
      })) as {data: UpdateBookingMutation};
      setIsLoading(false);
      return _booking.data.updateBooking as Booking;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onDeleteBooking = async (id: string): Promise<string | undefined> => {
    try {
      const deletedBooking = (await GraphQLAPI.graphql({
        query: deleteBooking,
        variables: {input: {id}},
      })) as {data: DeleteBookingMutation};
      return deletedBooking.data.deleteBooking?.id;
    } catch (e) {
      console.error(e.errors);
      throw e;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        onCreateBooking,
        onGetBooking,
        onGetBookings,
        onUpdateBooking,
        onDeleteBooking,
        isLoading,
      }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
