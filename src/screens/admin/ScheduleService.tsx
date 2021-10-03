/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Service, UpdateServiceInput} from '../../API';
import {ServiceContext} from '../../contexts';
import {BookingContext} from '../../contexts/BookingContext';
import {Button, Container, Picker, Spinner} from '../shared';
import {Calendar} from 'react-native-calendars';

type days = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

const ScheduleService = () => {
  const [change, setChange] = useState(false);
  const [selectedDays, setSelectedDays] = useState<days[]>([]);
  const [dates, setDates] = useState({});
  const {onGetServices, onUpdateService} = useContext(ServiceContext);

  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service>({});
  const [isLoading, setIsLoading] = useState(false);

  const getServices = async () => {
    await onGetServices({})
      .then(res => {
        setSelectedService(
          res.services.filter(
            service => service?.slots && service?.slots!.length > 0,
          )[0],
        );
        setServices(
          res.services.filter(
            service => service?.slots && service?.slots!.length > 0,
          ),
        );

        dateArray.map(date => {
          console.log(
            'loop result date',
            res.services.filter(
              service => service?.slots && service?.slots!.length > 0,
            ).length,
          );
          if (
            res.services
              .filter(
                service => service?.slots && service?.slots!.length > 0,
              )[0]
              .AvailableTimes!.some(
                time => time?.date! == dateConvertor(date).toString(),
              ) == true
          ) {
            const newDates = dates;
            newDates[dateConvertor(date).toString()] = {
              disabled: true,
              customStyles: {
                container: {
                  backgroundColor: 'green',
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
            };
            setDates(newDates);
            setChange(!change);
          } else {
            const newDates = dates;
            newDates[dateConvertor(date).toString()] = {
              disabled: false,
              customStyles: {
                container: {
                  backgroundColor: 'none',
                },
              },
            };
            setDates(newDates);
            setChange(!change);
          }
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getServices();
  }, []);

  const dateArray = [0, 1, 2, 3, 4, 5, 6, 7];

  const updateSchedule = async () => {
    setIsLoading(true);
    console.log('update selected service', selectedService);
    const _service: UpdateServiceInput = selectedService;
    selectedDays.map(day => {
      if (_service.AvailableTimes && _service.AvailableTimes?.length > 0) {
        _service.AvailableTimes = [
          ..._service.AvailableTimes,
          {
            slots: _service.slots,
            date: day.dateString,
          },
        ];
      } else {
        _service.AvailableTimes = [
          {
            slots: _service.slots,
            date: day.dateString,
          },
        ];
      }
    });
    await onUpdateService(_service).then(res => {
      if (res) {
        getServices();
      }
    });
  };

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

  useEffect(() => {
    return () => {
      setDates(dates);
    };
  }, [change]);

  const selectDate = (day: days) => {
    setChange(!change);
    const selectedDate = day.dateString;
    if (dates[selectedDate]) {
      if (!dates[selectedDate]?.disabled) {
        const newDates = dates;
        delete newDates[selectedDate];
        const updateDates = selectedDays.filter(
          date => date.dateString != selectedDate,
        );
        setSelectedDays(updateDates);

        setDates(newDates);
      }
    } else {
      if (!dates[selectedDate]?.disabled) {
        const newDates = dates;
        newDates[selectedDate] = {
          selected: true,
          endingDay: true,
          color: 'green',
          textColor: 'gray',
        };
        setDates(newDates);
        setSelectedDays([...selectedDays, day]);
        setFilteredServices(
          services
            .filter(service => service?.slots && service?.slots!.length > 0)
            .filter(
              service =>
                service.AvailableTimes!.some(
                  time => time!.date == selectedDate,
                ) == false,
            ),
        );
      }
    }
  };

  const findScheduledDates = (chosenService: Service) => {
    const newDates = dates;
    dateArray.map(date => {
      if (
        chosenService?.AvailableTimes!.some(
          time => time!.date == dateConvertor(date).toString(),
        ) == true
      ) {
        newDates[dateConvertor(date).toString()] = {
          disabled: true,
          customStyles: {
            container: {
              backgroundColor: 'green',
            },
            text: {
              color: 'black',
              fontWeight: 'bold',
            },
          },
        };
        setDates(newDates);
        setChange(!change);
        console.log('colur the log', dateConvertor(date));
        setSelectedService(chosenService);
      }

      if (
        chosenService?.AvailableTimes!.some(
          time => time!.date == dateConvertor(date).toString(),
        ) == false
      ) {
        newDates[dateConvertor(date).toString()] = {
          disabled: false,
        };
        setDates(newDates);
        setChange(!change);
        console.log('colur the log', dateConvertor(date));
        setSelectedService(chosenService);
      }
    });
  };

  return (
    <Container>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Container>
          <View style={{flex: 1}}>
            {services && services.length > 0 && (
              <Picker
                items={services.map(service => {
                  return {label: service.doctorName, value: service.id};
                })}
                onValueChange={value =>
                  findScheduledDates(
                    services.filter(service => service.id == value)[0],
                  )
                }
                placeholderLabel={selectedService?.doctorName}
              />
            )}
          </View>
          <View style={{flex: 3}}>
            <Calendar
              onDayPress={(day: days) => {
                selectDate(day);
              }}
              markedDates={dates}
              markingType={'custom'}
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 6)}
            />
          </View>
          <View style={styles.addButton}>
            {selectedDays && selectedDays.length > 0 && (
              <Button
                onPress={() => {
                  updateSchedule();
                }}>
                update
              </Button>
            )}
          </View>
        </Container>
      )}
    </Container>
  );
};

export default ScheduleService;

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 10,
    marginTop: 90,
    width: '100%',
    alignItems: 'center',
  },
});
