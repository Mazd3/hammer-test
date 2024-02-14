import fetch from "auth/FetchInterceptor";

const clientsService = {};

clientsService.getClients = function () {
  return fetch({
    url: "/users",
    method: "GET",
    headers: {
      "public-request": true,
    },
  });
};

clientsService.updateClient = function (payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 1000);
  });
};

export default clientsService;
