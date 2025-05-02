import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Loading from './components/ui/Loading';
import Weather from './components/ui/Weather';

const API_KEY = '9efc88c3aa153ed602b46480f7b45668';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState('');

  const getWeather = async (latitude: number, longitude: number) => {
    try {
      const {
        data: {
          main: { temp },
          weather,
        },
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setTemp(temp);
      setCondition(weather[0].main);
      setIsLoading(false);
      console.log({ temp, weather });
    } catch (error) {
      Alert.alert('Помилка при отриманні погоди', 'Спробуйте пізніше');
    }
  };

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert('Не можу отримати місце положення', 'Дуже сумно :(');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
};

export default App;
