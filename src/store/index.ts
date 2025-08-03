import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { newsApi } from '@/features/news/api/newsApi';
import { newsFiltersSlice } from '@/features/news/store/newsFiltersSlice';

export const store = configureStore({
    reducer: {
        [newsApi.reducerPath]: newsApi.reducer,
        newsFilters: newsFiltersSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: [newsApi.reducerPath],
            },
        }).concat(newsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;