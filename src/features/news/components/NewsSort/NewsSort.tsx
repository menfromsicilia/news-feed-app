import React from 'react';
import { Select, Space, Typography } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSortBy, setSortOrder } from '@/features/news/store/newsFiltersSlice';
import type { NewsFilters } from '@/types/news';
import styles from './NewsSort.module.css';

const { Text } = Typography;

interface SortOption {
  label: string;
  value: string;
  sortBy: NewsFilters['sortBy'];
  sortOrder: NewsFilters['sortOrder'];
}

const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Новые сначала',
    value: 'id_desc',
    sortBy: 'id',
    sortOrder: 'desc',
  },
  {
    label: 'Старые сначала',
    value: 'id_asc',
    sortBy: 'id',
    sortOrder: 'asc',
  },
  {
    label: 'По заголовку А-Z',
    value: 'title_asc',
    sortBy: 'title',
    sortOrder: 'asc',
  },
  {
    label: 'По заголовку Z-А',
    value: 'title_desc',
    sortBy: 'title',
    sortOrder: 'desc',
  },
  {
    label: 'По просмотрам ↑',
    value: 'views_asc',
    sortBy: 'views',
    sortOrder: 'asc',
  },
  {
    label: 'По просмотрам ↓',
    value: 'views_desc',
    sortBy: 'views',
    sortOrder: 'desc',
  },
  {
    label: 'По автору ↑',
    value: 'userId_asc',
    sortBy: 'userId',
    sortOrder: 'asc',
  },
  {
    label: 'По автору ↓',
    value: 'userId_desc',
    sortBy: 'userId',
    sortOrder: 'desc',
  },
];

export const NewsSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector(state => state.newsFilters.filters);

  const currentValue = `${sortBy}_${sortOrder}`;

  const handleSortChange = (value: string): void => {
    const selectedOption = SORT_OPTIONS.find(option => option.value === value);
    if (selectedOption) {
      dispatch(setSortBy(selectedOption.sortBy));
      dispatch(setSortOrder(selectedOption.sortOrder));
    }
  };

  return (
    <div className={styles.sortContainer}>
      <Space align="center" size="middle">
        <SortAscendingOutlined className={styles.sortIcon} />
        <Text className={styles.sortLabel}>
          Сортировка:
        </Text>
        <Select
          value={currentValue}
          onChange={handleSortChange}
          className={styles.sortSelect}
          size="large"
          style={{ minWidth: 200 }}
          options={SORT_OPTIONS.map(option => ({
            label: option.label,
            value: option.value,
          }))}
        />
      </Space>
    </div>
  );
};