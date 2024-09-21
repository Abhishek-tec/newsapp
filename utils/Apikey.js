import axios from "axios";

export const newsApiKey = "f66802fe6ce14a2eac862f8e0d7631ef";

const apiBaseUrl = `https://newsapi.org/v2`;

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`;
const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;
const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apiKey=${newsApiKey}`;
const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};
export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};
export const fetchDiscoverNews = async (discover) => {
  return await newsApiCall(discoverNewsUrl(discover));
};
export const fetchSearchNews = async (query) => {
  return await newsApiCall(searchNewsUrl(query));
};
