import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from '../slice/modals';
import settingsReducer from '../slice/settings';
import servicesReducer from '../slice/services';

const store = configureStore({
    reducer: {
        modals: modalsReducer,
        settings: settingsReducer,
        services: servicesReducer
    },
});

export default store;