/* eslint-disable prettier/prettier */
import React, {Context, createContext, useState} from 'react';
import {
  CreateServiceInput,
  CreateServiceMutation,
  DeleteServiceMutation,
  GetServiceQuery,
  ListServicesQuery,
  ListServicesQueryVariables,
  UpdateServiceInput,
  UpdateServiceMutation,
  Service,
} from '../API';
import {GraphQLAPI} from '@aws-amplify/api-graphql';
import {getService, listServices} from '../graphql/queries';
import {createService, deleteService, updateService} from '../graphql/mutations';
import prepareForUpdate from '../utils/prepareForUpdate';
import {Toast} from 'native-base';

type ServiceContextType = {
  onGetServices: (variables: ListServicesQueryVariables) => Promise<{
    services: Service[];
    nextToken: string | null | undefined;
  }>;
  onGetService: (id: string) => Promise<Service>;
  onCreateService: (createServiceInput: CreateServiceInput) => Promise<Service>;
  onUpdateService: (updateServiceInput: UpdateServiceInput) => Promise<Service>;
  onDeleteService: (id: string) => Promise<string | undefined>;
  isLoading: boolean;
};

export const ServiceContext: Context<ServiceContextType> =
  createContext<ServiceContextType>({} as ServiceContextType);

const ServiceProvider: React.FC<React.ReactNode> = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onGetServices = async (
    variables: ListServicesQueryVariables,
  ): Promise<{
    services: Service[];
    nextToken: string | null | undefined;
  }> => {
    setIsLoading(true);
    try {
      const _listServices = (await GraphQLAPI.graphql({
        query: listServices,
        variables,
      })) as {data: ListServicesQuery};
      const services = _listServices.data.listServices?.items as Service[];
      setIsLoading(false);
      return {services, nextToken: _listServices.data.listServices?.nextToken};
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      throw e;
    }
  };

  const onGetService = async (id: string): Promise<Service> => {
    try {
      const service = (await GraphQLAPI.graphql({
        query: getService,
        variables: {id: id},
      })) as {data: GetServiceQuery};
      return service.data.getService as Service;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onCreateService = async (
    createServiceInput: CreateServiceInput,
  ): Promise<Service> => {
    try {
      const newService = (await GraphQLAPI.graphql({
        query: createService,
        variables: {input: createServiceInput},
      })) as {data: CreateServiceMutation};
      return newService.data.createService as Service;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onUpdateService = async (
    updateServiceInput: UpdateServiceInput,
  ): Promise<Service> => {
    try {
      prepareForUpdate(updateServiceInput);
      const service = (await GraphQLAPI.graphql({
        query: updateService,
        variables: {input: updateServiceInput},
      })) as {data: UpdateServiceMutation};
      Toast.show({text: 'Service updated successfully', type: 'success'});
      return service.data.updateService as Service;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onDeleteService = async (id: string): Promise<string | undefined> => {
    try {
      const deletedService = (await GraphQLAPI.graphql({
        query: deleteService,
        variables: {input: {id}},
      })) as {data: DeleteServiceMutation};
      return deletedService.data.deleteService?.id;
    } catch (e) {
      console.error(e.errors);
      throw e;
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        onGetService,
        onCreateService,
        onDeleteService,
        onGetServices,
        onUpdateService,
        isLoading,
      }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
