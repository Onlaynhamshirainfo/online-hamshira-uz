import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    defaultSum: 20000,
    totalSum: 0,
    currentPrice: [],
  },
  reducers: {
    getDefaultSum: (state) => {
      state.totalSum = state.defaultSum;
    },
    handleTotalSum: (state) => {
      //   state.totalSum = state.defaultSum;
      state.totalSum = state.currentPrice.reduce(
        (total, item) => total + item.price,
        state.defaultSum
      );
    },
    changePriceByButtons: (state, action) => {
      const { serviceId, price, count, id, name } = action.payload;
      const existingItemIndex = state.currentPrice.findIndex(
        (item) => item.service_id === id
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        state.currentPrice[existingItemIndex] = {
          ...state.currentPrice[existingItemIndex],
          service_id: id,
          price: price,
          count: count,
          name: name,
        };
      } else {
        // Add new item
        state.currentPrice.push({
          service_id: id,
          price: price,
          count: count,
          illness_cause_id: serviceId,
          name: name,
        });
      }
    },
    removeFromCurrentPrice: (state, action) => {
      const idToRemove = action.payload;
      state.currentPrice = state.currentPrice.filter(
        (item) => item.illness_cause_id !== idToRemove
      );
    },
    getSpecialistPrices: (state) => {
      if (typeof window !== "undefined") {
        const specialists = JSON.parse(
          localStorage.getItem("currentMapDetails")
        );
        const currentSpecialist = JSON.parse(
          localStorage.getItem("currentOrder")
        );

        state.defaultSum = specialists?.specialities.find(
          (item) => item?.id == currentSpecialist?.id
        )?.price;
      }
    },
  },
});

export const {
  handleTotalSum,
  changePriceByButtons,
  getDefaultSum,
  removeFromCurrentPrice,
  getSpecialistPrices
} = servicesSlice.actions;

export default servicesSlice.reducer;
