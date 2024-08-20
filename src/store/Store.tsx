import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserOnlyFilter = createFilter("user", ["user"]);

const persistConfig = {
    key: "root", 
    storage: AsyncStorage,
    whitelist: ["user"], 
    transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof Store.dispatch;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(Store);
