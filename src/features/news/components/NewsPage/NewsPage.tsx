import React from 'react';
import { Layout, Row, Col, Spin, Alert, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { addTag } from '@/features/news/store/newsFiltersSlice';
import { useInfiniteNews } from '@/hooks/useInfiniteNews';
import { NewsCard } from '@/features/news/components/NewsCard/NewsCard';
import { NewsSearch } from '@/features/news/components/NewsSearch';
import { NewsSort } from '@/features/news/components/NewsSort';
import { NewsFilters } from '@/features/news/components/NewsFilters';
import type { NewsPost } from '@/types/news';
import styles from './NewsPage.module.css';

export const NewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.newsFilters);
  
  const {
    posts,
    hasMore,
    isLoading,
    isError,
    fetchMore,
  } = useInfiniteNews();

  const handleTagClick = (tag: string): void => {
    dispatch(addTag(tag));
  };

  if (isError) {
    return (
      <Layout className={styles.layout}>
        <Layout.Content className={styles.content}>
          <Alert
            message="Ошибка загрузки"
            description="Не удалось загрузить новости. Попробуйте обновить страницу."
            type="error"
            showIcon
          />
        </Layout.Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div className={styles.headerContent}>
          <Typography.Title level={1} className={styles.title}>
             Новостная лента
          </Typography.Title>
        </div>
      </Layout.Header>

      <Layout.Content className={styles.content}>
        <div className={styles.container}>
          <div className={styles.searchSection}>
            <NewsSearch />
          </div>

          <NewsSort />

          {(filters.selectedTags.length > 0 || filters.search) && (
            <div className={styles.filtersSection}>
              <NewsFilters />
            </div>
          )}

          <div className={styles.newsSection}>
            {isLoading && posts.length === 0 ? (
              <div className={styles.loading}>
                <Spin size="large" tip="Загрузка новостей..." />
              </div>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={posts.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  loader={
                    <div className={styles.infiniteLoader}>
                      <Spin size="default" tip="Загружаем больше новостей..." />
                    </div>
                  }
                  endMessage={
                    posts.length > 0 ? (
                      <div className={styles.endMessage}>
                        <Typography.Text type="secondary">
                           Вы просмотрели все новости!
                        </Typography.Text>
                      </div>
                    ) : null
                  }
                  scrollThreshold={0.8}
                  style={{ overflow: 'visible' }}
                >
                  <Row gutter={[16, 16]} className={styles.newsGrid}>
                    {posts.map((post: NewsPost) => (
                      <Col
                        key={post.id}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={6}
                      >
                        <NewsCard post={post} onTagClick={handleTagClick} />
                      </Col>
                    ))}
                  </Row>
                </InfiniteScroll>

                {posts.length === 0 && !isLoading && (
                  <div className={styles.emptyState}>
                    <Alert
                      message="Новости не найдены"
                      description="Попробуйте изменить параметры поиска или фильтры."
                      type="info"
                      showIcon
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};