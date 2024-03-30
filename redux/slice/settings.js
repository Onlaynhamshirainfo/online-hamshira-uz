import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    info: null,
    news: [],
    currentNews: null,
    orderInfo: {},
  },
  reducers: {
    getItemsFromLocal: (state) => {
      let local =
        typeof window !== "undefined"
          ? localStorage.getItem("auth__info")
          : null;

      let local2 =
        typeof window !== "undefined"
          ? localStorage.getItem("news__archive")
          : null;
      state.info = JSON.parse(local);
      state.news = JSON.parse(local2);
    },
    changeAllNews: (state, action) => {
      const existingIndex = state.news.findIndex(
        (item) => item.id == action.payload.id
      );

      if (existingIndex !== -1) {
        state.news.splice(existingIndex, 1);
        localStorage.setItem("news__archive", JSON.stringify(state.news));
      } else {
        state.news.push(action.payload);
        localStorage.setItem("news__archive", JSON.stringify(state.news));
      }
    },
    changeItemsFromOrder: (state) => {
      if (typeof window !== "undefined") {
        const orderRelatives =
          JSON.parse(localStorage.getItem("orderRelatives")) ?? "";
        const orderDates = JSON.parse(localStorage.getItem("orderDates"));
        const locationDetails = JSON.parse(
          localStorage.getItem("currentMapDetails")
        );
        const specialistDetails = JSON.parse(
          localStorage.getItem("currentOrder")
        );
        const totalPrice = localStorage.getItem("total__price");
        const items = JSON.parse(localStorage.getItem("illness__lists"));
        const photos = JSON.parse(localStorage.getItem("orderImages"));
        const currentSpecialist = locationDetails?.specialities?.find(
          (item) => item.id == specialistDetails?.id
        );

        state.orderInfo.relative_id = orderRelatives;
        state.orderInfo = { ...state.orderInfo, ...orderDates };
        state.orderInfo.location_name = locationDetails?.display_name;
        state.orderInfo.latitude = locationDetails?.lat;
        state.orderInfo.longitude = locationDetails?.lon;
        state.orderInfo.branch_id = locationDetails?.branch?.id;
        state.orderInfo.speciality_id = specialistDetails?.id;
        state.orderInfo.speciality_price = currentSpecialist?.price;
        state.orderInfo.price = totalPrice
          ? Number(totalPrice)
          : currentSpecialist?.price;
        state.orderInfo.items = items || [];
        state.orderInfo.patient_pictures = photos;
        state.orderInfo.info_for_nurse = orderDates?.info_for_nurse;
      }
    },
    removeItemsFromLocal: (state) => {
      localStorage.removeItem("total__price");
      localStorage.removeItem("illness__lists");
      localStorage.removeItem("orderImages");
      localStorage.removeItem("orderRelatives");
      localStorage.removeItem("orderDates");
      localStorage.removeItem("currentOrder");
      localStorage.removeItem("currentMap");
      localStorage.removeItem("orderReasons");
      localStorage.removeItem("currentType");
      localStorage.removeItem("currentMapDetails");
      localStorage.removeItem("orderRelativePerson");
    },
  },
});

export const {
  getItemsFromLocal,
  changeAllNews,
  changeItemsFromOrder,
  removeItemsFromLocal,
} = settingsSlice.actions;

export default settingsSlice.reducer;
