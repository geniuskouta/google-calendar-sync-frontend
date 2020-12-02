import axios from "axios";
const endpoint = "http://localhost:8000";

export const getAuthUrl = async (redirectUri) => {
  return await axios
    .post(`${endpoint}/event/save`, {
      credentials: {
        type: null,
        token: null,
        redirectUri: redirectUri,
      },
    })
    .then((response) => {
      if (typeof response.data === "string") {
        return response.data; //auth url
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveEventOnCalendar = async (event, type, token, redirectUri) => {
  return await axios
    .post(`${endpoint}/event/save`, {
      startTime: event.startTime,
      endTime: event.endTime,
      summary: event.summary,
      location: event.location,
      description: event.description,
      credentials: {
        type: type,
        token: token,
        redirectUri: redirectUri
      }
    })
    .then((response) => {
      const { refreshToken } = response.data;
      if (refreshToken) {
        //   return { type: REFRESH_TOKEN, token: refreshToken };
        return refreshToken;
      }
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};
