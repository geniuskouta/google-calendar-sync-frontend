import axios from "axios";
// const endpoint = "http://localhost:8000";
const endpoint = "https://funplan-api.herokuapp.com";

export const getPlans = async () => {
  return await axios
  .get(`${endpoint}/plans`)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

export const getPlanById = async (planId) => {
  return await axios
  .get(`${endpoint}/plan/${planId}`)
  .then((response) => {
    return  response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

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
        console.log(`token resposne: ${response.data}`);
        return refreshToken;
    })
    .catch((err) => {
      console.log(err);
    });
};
