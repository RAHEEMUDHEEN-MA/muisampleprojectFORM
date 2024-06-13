import axios from "axios";

const apiKey = "ZTVNbUVpWnM1YU1NNHRVRXpIT21oWmdNbHJlcmE5clZBWlM4cTVrYg==";

export const getCountries = async () => {
  try {
    const response = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCities = async (country) => {
  // console.log("fetching cities",country);
  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${country}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

