import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { NewsFilters, NewsPost } from '@/types/news';

interface NewsFiltersState {
    filters: NewsFilters;
    infiniteScroll: {
        skip: number;
        hasMore: boolean;
        allPosts: NewsPost[];
        isLoading: boolean;
    };
}

const initialState: NewsFiltersState = {
    filters: {
        search: '',
        selectedTags: [],
        sortBy: 'id',
        sortOrder: 'desc',
    },
    infiniteScroll: {
        skip: 0,
        hasMore: true,
        allPosts: [],
        isLoading: false,
    },
};

export const newsFiltersSlice = createSlice({
    name: 'newsFilters',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
            // Сброс infinite scroll при поиске
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
        },

        setSelectedTags: (state, action: PayloadAction<string[]>) => {
            state.filters.selectedTags = action.payload;
            // Сброс infinite scroll при изменении тегов
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
        },

        addTag: (state, action: PayloadAction<string>) => {
            if (!state.filters.selectedTags.includes(action.payload)) {
                state.filters.selectedTags.push(action.payload);
                // Сброс infinite scroll при добавлении тега
                state.infiniteScroll.skip = 0;
                state.infiniteScroll.hasMore = true;
                state.infiniteScroll.allPosts = [];
            }
        },

        removeTag: (state, action: PayloadAction<string>) => {
            state.filters.selectedTags = state.filters.selectedTags.filter(
                tag => tag !== action.payload
            );
            // Сброс infinite scroll при удалении тега
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
        },

        setSortBy: (
            state,
            action: PayloadAction<NewsFilters['sortBy']>
        ) => {
            state.filters.sortBy = action.payload;
            // Сброс infinite scroll при сортировке
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
        },

        setSortOrder: (
            state,
            action: PayloadAction<NewsFilters['sortOrder']>
        ) => {
            state.filters.sortOrder = action.payload;
            // Сброс infinite scroll при сортировке
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
        },

        // Новые actions для infinite scroll
        setInfiniteScrollLoading: (state, action: PayloadAction<boolean>) => {
            state.infiniteScroll.isLoading = action.payload;
        },

        appendPosts: (state, action: PayloadAction<NewsPost[]>) => {
            const newPosts = action.payload;
            state.infiniteScroll.allPosts.push(...newPosts);
            state.infiniteScroll.skip += newPosts.length;
            
            // Если получили меньше 10 постов, значит данные закончились
            if (newPosts.length < 10) {
                state.infiniteScroll.hasMore = false;
            }
        },

        resetInfiniteScroll: (state) => {
            state.infiniteScroll.skip = 0;
            state.infiniteScroll.hasMore = true;
            state.infiniteScroll.allPosts = [];
            state.infiniteScroll.isLoading = false;
        },

        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.infiniteScroll.hasMore = action.payload;
        },

        resetFilters: state => {
            state.filters = initialState.filters;
            state.infiniteScroll = initialState.infiniteScroll;
        },
    },
});

export const {
    setSearchQuery,
    setSelectedTags,
    addTag,
    removeTag,
    setSortBy,
    setSortOrder,
    setInfiniteScrollLoading,
    appendPosts,
    resetInfiniteScroll,
    setHasMore,
    resetFilters,
} = newsFiltersSlice.actions;

export default newsFiltersSlice.reducer;