import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    NewsApiResponse,
    NewsPost,
    NewsSearchParams,
} from '@/types/news';

const API_BASE_URL = 'https://dummyjson.com';

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    tagTypes: ['News'],
    endpoints: builder => ({
        getNewsPosts: builder.query<NewsPost[], NewsSearchParams>({
            query: ({
                        q,
                        sortBy,
                        order,
                        select,
                        selectedTags = [],
                        limit = 10,
                        skip = 0,
                    }: NewsSearchParams = {}) => {
                
                const params = new URLSearchParams();
                params.append('limit', limit.toString());
                params.append('skip', skip.toString());

                if (q) {
                    return {
                        url: `/posts/search?q=${encodeURIComponent(q)}&${params.toString()}`,
                    };
                }

                if (sortBy && order) {
                    params.append('sortBy', sortBy);
                    params.append('order', order);
                }

                if (select) {
                    params.append('select', select);
                }

                return {
                    url: `/posts?${params.toString()}`,
                };
            },
            transformResponse: (response: NewsApiResponse, _meta, arg): NewsPost[] => {
                const { selectedTags = [] } = arg;
                
                let filteredPosts = response.posts;
                
                if (selectedTags.length > 0) {
                    filteredPosts = response.posts.filter(post => 
                        selectedTags.some(selectedTag => 
                            post.tags.includes(selectedTag)
                        )
                    );
                }
                
                return filteredPosts;
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'News' as const, id })),
                        'News',
                    ]
                    : ['News'],
        }),

        getNewsPostById: builder.query<NewsPost, number>({
            query: id => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'News', id }],
        }),

        getAllUniqueTags: builder.query<string[], void>({
            query: () => '/posts?limit=0&select=tags',
            transformResponse: (response: NewsApiResponse): string[] => {
                const allTags = response.posts.flatMap(post => post.tags);
                return [...new Set(allTags)].sort();
            },
            providesTags: ['News'],
        }),
    }),
});

export const {
    useGetNewsPostsQuery,
    useGetNewsPostByIdQuery,
    useGetAllUniqueTagsQuery,
    useLazyGetNewsPostsQuery,
} = newsApi;