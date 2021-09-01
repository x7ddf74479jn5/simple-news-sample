export type ArticleType = {
  author: string;
  title: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
};

export type WeatherNewsType = {
  current: {
    temp: number;
    clouds: number;
    weather: [
      conditions: {
        main: string;
        icon: string;
      }
    ];
  };
  daily: [
    date: {
      dt: number;
      clouds: number;
      temp: {
        min: number;
        max: number;
      };
      weather: [
        conditions: {
          id: number;
          icon: string;
        }
      ];
    }
  ];
};
