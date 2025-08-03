import React from 'react';
import { Tag, Button, Space, Typography, Divider } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { 
  removeTag, 
  setSelectedTags, 
  resetFilters 
} from '@/features/news/store/newsFiltersSlice';
import styles from './NewsFilters.module.css';

const { Text, Title } = Typography;

export const NewsFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTags } = useAppSelector(state => state.newsFilters.filters);

  const handleRemoveTag = (tag: string): void => {
    dispatch(removeTag(tag));
  };

  const handleClearTags = (): void => {
    dispatch(setSelectedTags([]));
  };

  if (selectedTags.length === 0) {
    return null;
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.header}>
        <Space align="center">
          <FilterOutlined className={styles.headerIcon} />
          <Title level={4} className={styles.headerTitle}>
            Активные фильтры
          </Title>
          <Tag className={styles.selectedCount}>
            {selectedTags.length}
          </Tag>
        </Space>
        
        <Button
          type="text"
          size="small"
          icon={<ClearOutlined />}
          onClick={handleClearTags}
          className={styles.clearButton}
        >
          Очистить теги
        </Button>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.selectedSection}>
        <Text className={styles.sectionTitle}>
          Фильтр по тегам ({selectedTags.length}):
        </Text>
        <div className={styles.selectedTags}>
          {selectedTags.map((tag) => (
            <Tag
              key={tag}
              closable
              onClose={() => handleRemoveTag(tag)}
              color="blue"
              className={styles.selectedTag}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>


    </div>
  );
};