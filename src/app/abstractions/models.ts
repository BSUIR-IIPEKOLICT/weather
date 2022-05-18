export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
  isImportant: boolean;
};

export type Weather = {
  name: string;
  clouds: {
    all: number;
  };
  main: {
    humidity: number;
    pressure: number;
    temp: number;
  };
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type DeleteModel = {
  id: number;
};
