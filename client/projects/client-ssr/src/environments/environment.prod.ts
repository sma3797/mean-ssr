const HOST = "http://localhost:4000/";
const production = true;

export const environment = {
  env: "prod",
  production,
  server: {
    self: {
      HOST,
      getUrl() {
        return `${this.HOST}`;
      },
      getAPIUrl() {
        return `${this.HOST}api/`;
      },
    },
  },
};
