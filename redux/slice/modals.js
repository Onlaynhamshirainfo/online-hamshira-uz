import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    registerModal: false,
    codeModal: false,
    langStartModal: null,
    sliderModal: false,
    infoModal: false,
    quitModal: false,
    langModal: false,
    contactUs: false,
    orderType: false,
    currentOrder: null,
    active: null,
    orderCancel: false,
    currentOrderId: null,
  },
  reducers: {
    toggleRegisterModal: (state) => {
      state.registerModal = !state.registerModal;
    },
    toggleCodeModal: (state) => {
      state.codeModal = !state.codeModal;
    },
    toggleLangStartModal: (state) => {
      state.langStartModal = !state.langStartModal;
    },
    changeLangStartModal: (state) => {
      localStorage.getItem("isLocal")
        ? localStorage.getItem("isLocal")
        : localStorage.setItem("isLocal", "locale");
      if (localStorage.getItem("isLocal") == "locale") {
        state.langStartModal = true;
      } else {
        state.langStartModal = false;
      }
    },
    toggleSliderModal: (state) => {
      state.sliderModal = !state.sliderModal;
      localStorage.setItem("isSlider", "finish");
    },
    changeSliderModal: (state) => {
      if (localStorage.getItem("isSlider") == "start") {
        state.sliderModal = true;
      } else {
        state.sliderModal = false;
      }
    },
    toggleInfoModal: (state) => {
      state.infoModal = !state.infoModal;
    },
    toggleQuitModal: (state) => {
      state.quitModal = !state.quitModal;
    },
    toggleLangModal: (state) => {
      state.langModal = !state.langModal;
    },
    toggleContactUsModal: (state) => {
      state.contactUs = !state.contactUs;
    },
    toggleOrderTypeModal: (state, actions) => {
      // state.orderType = !state.orderType;
      state.currentOrder = actions.payload;
      state.active = null;
    },
    changeOrderTypes: (state, actions) => {
      state.active = actions.payload;
    },
    getActiveOrderFromLocal: (state) => {
      let isUndefined = typeof window !== "undefined";
      let type = isUndefined ? localStorage.getItem("currentType") : null;
      let order = isUndefined
        ? JSON.parse(localStorage.getItem("currentOrder"))
        : null;

      state.active = type;
      state.currentOrder = order;
    },
    toggleOrderCancelModal: (state, actions) => {
      state.orderCancel = !state.orderCancel;
      state.currentOrderId = actions?.payload;
    },
  },
});

export const {
  toggleRegisterModal,
  toggleCodeModal,
  toggleLangStartModal,
  changeLangStartModal,
  toggleSliderModal,
  changeSliderModal,
  toggleInfoModal,
  toggleQuitModal,
  toggleLangModal,
  toggleContactUsModal,
  toggleOrderTypeModal,
  changeOrderTypes,
  getActiveOrderFromLocal,
  toggleOrderCancelModal
} = modalsSlice.actions;

export default modalsSlice.reducer;
