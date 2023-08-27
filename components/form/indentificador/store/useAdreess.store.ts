import { LatLng } from 'leaflet';
import { create } from 'zustand'

interface AddressType {
  waterLevel: string
  city: string,
  city_district: string,
  country: string,
  country_code: string,
  postcode: string,
  state: string,
  neighbourhood: string,
  road: string,
  location: LatLng
}

// export const useAdreessStore :create((set) => ({
//   stateAdreess: [],
//   stateError: false,
//   stateLoading: false,
//   actionAdreess: (longitude: number, latitude: number, access_token: string) => set((state: { stateAdreess: [], stateError: boolean, stateLoading: boolean }) => {

//   }
//   ),
// }));

export const useAdreessClick = create((set) => ({
  waterLevel: "",
  city: "",
  city_district: "",
  country: "",
  country_code: "",
  postcode: "",
  uf: "",
  neighbourhood: "",
  road: "",
  location: [0, 0],

  actionAdreess: (address: AddressType, location: any) => {
    return set((state: {
      waterLevel: string
      city: string,
      city_district: string,
      country: string
      country_code: string
      neighbourhood: string
      postcode: string
      uf: string
      road: string
      location: LatLng
    }) =>
    ({
      waterLevel: address.waterLevel,
      city: address.city,
      city_district: address.city_district,
      country: address.country,
      country_code: address.country_code,
      postcode: address.postcode,
      uf: address.state,
      neighbourhood: address.neighbourhood,
      road: address.road,
      location: address.location

    })

    )
  },
  removeAdreess: () => {
    return set((state: {
      waterLevel: string
      city: string,
      city_district: string,
      country: string
      country_code: string
      neighbourhood: string
      postcode: string
      uf: string
      road: string
      location: any
    }) => ({
      waterLevel: "",
      city: "",
      city_district: "",
      country: "",
      country_code: "",
      postcode: "",
      uf: "",
      neighbourhood: "",
      road: "",
      location: [0, 0]

    })
    )
  },
}));



