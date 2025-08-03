import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSearchQuery } from '@/features/news/store/newsFiltersSlice';
import styles from './NewsSearch.module.css';

const { Search } = Input;

export const NewsSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(state => state.newsFilters.filters);
  
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleSearch = (value: string): void => {
    dispatch(setSearchQuery(value.trim()));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim() === '') {
      dispatch(setSearchQuery(''));
    }
  };

  const handlePressEnter = (): void => {
    handleSearch(inputValue);
  };

  return (
    <div className={styles.searchContainer}>
      <Search
        placeholder="Поиск новостей..."
        value={inputValue}
        onChange={handleChange}
        onSearch={handleSearch}
        onPressEnter={handlePressEnter}
        className={styles.searchInput}
        size="large"
        allowClear
        enterButton={
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            className={styles.searchButton}
          >
            Найти
          </Button>
        }
      />
      
      {search && (
        <div className={styles.searchInfo}>
          Поиск по запросу: <span className={styles.searchQuery}>"{search}"</span>
        </div>
      )}
    </div>
  );
};