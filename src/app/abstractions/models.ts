export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
  isImportant: boolean;
};

export type Weather = {
  name: string;
  main: {
    humidity: number;
    pressure: number;
    temp: number;
  };
  wind: {
    deg: number;
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

export type Setting = {
  id: string;
  city: string;
};

export type ImageParams = {
  alt_description: string;
  description: string;
  urls: {
    small: string;
  };
};
