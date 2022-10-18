import { axiosInstanceNoAuth } from "./setup";

export const handleSubmitCoordinatesApi = (data: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    axiosInstanceNoAuth()
      .post(`/user/insert-user`, data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleLookUpApi = (
  lat: number,
  lng: number,
  radius: number
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    axiosInstanceNoAuth()
      .post(`/user/fetch-user`, { lat, lng, radius })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
