/* eslint-disable prettier/prettier */
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  CreateServiceInput,
  CreateServiceMutation,
  DeleteServiceMutation,
  GetServiceQuery,
  ListServicesQuery,
  ListServicesQueryVariables,
  Service,
  UpdateServiceInput,
  UpdateServiceMutation,
} from '../API';
import {GRAPHQL_AUTH_MODE, GraphQLAPI} from '@aws-amplify/api-graphql';
import {getService, listServices} from '../graphql/queries';
import {
  createService,
  deleteService,
  updateService,
} from '../graphql/mutations';
import prepareForUpdate from '../utils/prepareForUpdate';
import {Toast} from 'native-base';
import {AuthContext} from './authContext';
import {CompanyContext} from './companyContext';

type ServiceContextType = {
  onGetServices: (variables: ListServicesQueryVariables) => Promise<{
    services: Service[];
    nextToken: string | null | undefined;
  }>;
  onGetService: (id: string) => Promise<Service>;
  onCreateService: (createCompanyInput: CreateServiceInput) => Promise<Service>;
  onUpdateService: (updateCompanyInput: UpdateServiceInput) => Promise<Service>;
  onDeleteService: (id: string) => Promise<string | undefined>;
  isLoading: boolean;
  companyServices: Service[] | null;
  selectedFilteredService: Service | null;
  findSelectedCompany: (serviceId: string) => void;
  pickerDates: string[] | null;
  selectedFilteredDate: string | null;
  findSelectedDate: (id: string) => void;
};

export const ServiceContext = createContext<ServiceContextType>(
  {} as ServiceContextType,
);

const ServiceProvider: FC<ReactNode> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {currentUser} = useContext(AuthContext);
  const {onGetCompanies} = useContext(CompanyContext);
  const [selectedFilteredService, setSelectedFilteredService] =
    useState<Service | null>(null);

  const [companyServices, setCompanyServices] = useState<Service[] | null>([]);
  const dateArray = [0, 1, 2, 3, 4, 5, 6, 7];
  const dateConvertor = num => {
    const gettingDate = new Date(
      new Date().setDate(new Date().getDate() + num),
    ).toLocaleDateString();
    return [
      `20${gettingDate.split('/')[2]}`,
      gettingDate.split('/')[0],
      gettingDate.split('/')[1],
    ].join('-');
  };
  const [pickerDates] = useState<string[string]>(
    dateArray?.map(num => {
      return {date: dateConvertor(num)};
    }),
  );
  const [selectedFilteredDate, setSelectedFilteredDate] = useState<
    string[string]
  >({date: dateConvertor(dateArray[0])});
  useEffect(() => {
    getCompanyServices();
  }, [currentUser]);

  const findSelectedDate = (date: string) => {
    if (date != undefined) {
      const findDate = pickerDates?.filter(obj => obj.date == date);
      setSelectedFilteredDate(findDate[0]);
      console.log('filtered function called', findDate[0]);
    }
  };
  const findSelectedCompany = (serviceId: string) => {
    if (serviceId != undefined) {
      const find = companyServices?.filter(service => service.id == serviceId);
      setSelectedFilteredService(find[0]);
    }
  };
  const onGetServices = async (
    variables: ListServicesQueryVariables,
  ): Promise<{
    services: Service[];
    nextToken: string | null | undefined;
  }> => {
    try {
      const _listServices = (await GraphQLAPI.graphql({
        query: listServices,
        variables,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as {data: ListServicesQuery};
      const services = _listServices.data.listServices?.items as Service[];
      return {
        services,
        nextToken: _listServices.data.listServices?.nextToken,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  const getCompanyServices = async () => {
    const userid = currentUser?.attributes?.sub;
    if (currentUser) {
      await onGetCompanies({filter: {editors: {contains: userid}}}).then(
        async res => {
          await onGetServices({
            filter: {companyID: {eq: res.companies[0]?.id!}},
          }).then(res => {
            console.log('from serivce context', res);
            const tempFilterableServices = res.services.filter(
              service => service?.slotsTemplate?.length > 0,
            );
            console.log('temp filterable serivices', tempFilterableServices);
            setCompanyServices([
              {id: 'all', name: 'All Services'},
              ...tempFilterableServices,
            ]);
            setSelectedFilteredService(
              [{id: 'all', name: 'All Services'}, ...res.services][0],
            );
          });
        },
      );
    }
  };
  const onGetService = async (id: string): Promise<Service> => {
    try {
      const _service = (await GraphQLAPI.graphql({
        query: getService,
        variables: {id: id},
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as {data: GetServiceQuery};
      return _service.data.getService as Service;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onCreateService = async (
    createServiceInput: CreateServiceInput,
  ): Promise<Service> => {
    setIsLoading(true);
    try {
      const newCompany = (await GraphQLAPI.graphql({
        query: createService,
        variables: {input: createServiceInput},
      })) as {data: CreateServiceMutation};
      setIsLoading(false);
      return newCompany.data.createService as Service;
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      throw e;
    }
  };

  const onUpdateService = async (
    updateServiceInput: UpdateServiceInput,
  ): Promise<Service> => {
    try {
      prepareForUpdate(updateServiceInput);
      const _service = (await GraphQLAPI.graphql({
        query: updateService,
        variables: {input: updateServiceInput},
      })) as {data: UpdateServiceMutation};
      Toast.show({text: 'service Updated Successfully', type: 'success'});
      return _service.data.updateService as Service;
    } catch (e) {
      console.error(e);
      Toast.show({text: e.message, type: 'danger'});
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
        onCreateService,
        onGetService,
        onGetServices,
        onUpdateService,
        onDeleteService,
        isLoading,
        companyServices,
        selectedFilteredService,
        findSelectedCompany,
        pickerDates,
        selectedFilteredDate,
        findSelectedDate,
      }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
