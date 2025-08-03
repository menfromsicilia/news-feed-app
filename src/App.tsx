import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { store } from '@/store';
import { NewsPage } from '@/features/news/components/NewsPage';
import '@/shared/styles/variables.css';
import './App.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ConfigProvider
                locale={ruRU}
                theme={{
                    token: {
                        colorPrimary: '#076cfc',
                        colorSuccess: '#c3fdd4',
                        borderRadius: 8,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    },
                }}
            >
                <div className="app">
                    <NewsPage />
                </div>
            </ConfigProvider>
        </Provider>
    );
};

export default App;
