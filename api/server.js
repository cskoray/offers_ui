import { create } from "apisauce";

const OFFERS_BASE_URI = "/v1/api/offers";
const FAVORITES_BASE_URI = "/v1/api/favorites";

const api = create({
  baseURL: "https://8l02e8pe0f.execute-api.eu-west-2.amazonaws.com/prod",
});

const naviMonitor = (request, response) =>
  console.log("request=>", request, "response=> ", response);
api.addMonitor(naviMonitor);

export const getOffers = async () => {
  return api.get(OFFERS_BASE_URI);
};

export const getFavorites = async () => {
  return api.get(
    FAVORITES_BASE_URI + "?userKey=e80013c2-74b2-4ca2-99ef-ffc81d385de3"
  );
};

export const addFavorite = async (offerKey) => {
  return api.post(OFFERS_BASE_URI + "/" + offerKey + "/favorite");
};

export const deleteFavorite = async (favoriteKey) => {
  return api.delete(OFFERS_BASE_URI + "/" + favoriteKey + "/favorite");
};

export default {
  getOffers,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
