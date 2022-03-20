const HOST = "http://localhost:4000/";
const production = false;

export const environment = {
  env: "stage",
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
