type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type WikiResult = {
  pageid: string;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

type WikiSearchResults = {
  query?: {
    pages?: WikiResult[];
  };
};

type UnsplashImage = {
  description: string;
  user: {
    username: string;
  };
  urls: {
    raw: string;
  };
  width: number;
  height: number;
};

type UnsplashUser = {
  username: string;
  first_name: string;
  last_name: string;
};

type UnsplashSearchRes = {
  results: UnsplashImage[];
};
