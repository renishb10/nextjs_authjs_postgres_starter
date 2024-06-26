const paths = {
  homePath: () => '/',
  aboutPath: () => '/about',
  profilePath: (userID: string) => `/profile/${userID}`,
};

export default paths;
