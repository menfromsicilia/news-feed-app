import React from 'react';
import { Card, Tag, Typography, Space, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

import type { NewsPost } from '@/types/news';
import styles from './NewsCard.module.css';

const { Title, Paragraph, Text } = Typography;

interface NewsCardProps {
    post: NewsPost;
    onTagClick?: (tag: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ post, onTagClick }) => {
    const handleTagClick = (tag: string): void => {
        onTagClick?.(tag);
    };

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <Card
            className={styles.newsCard}
            hoverable
            size="default"
            bodyStyle={{ padding: '20px' }}
            actions={[
                <Space key="reactions" size="large" className={styles.actions}>
                    <Space size="small">
                        <LikeOutlined />
                        <Text type="secondary">{post.reactions.likes}</Text>
                    </Space>
                    <Space size="small">
                        <DislikeOutlined />
                        <Text type="secondary">{post.reactions.dislikes}</Text>
                    </Space>
                    <Space size="small">
                        <EyeOutlined />
                        <Text type="secondary">{post.views}</Text>
                    </Space>
                </Space>,
            ]}
        >
            <div className={styles.cardHeader}>
                <Space size="middle" align="start">
                    <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        className={styles.userAvatar}
                    />
                    <div className={styles.headerContent}>
                        <Text type="secondary" className={styles.userId}>
                            User {post.userId}
                        </Text>
                    </div>
                </Space>
            </div>

            <Title level={4} className={styles.title}>
                {truncateText(post.title, 80)}
            </Title>

            <Paragraph className={styles.body}>
                {post.body}
            </Paragraph>

            <div className={styles.tagsContainer}>
                <Space size={[8, 8]} wrap>
                    {post.tags.map((tag) => (
                        <Tag
                            key={tag}
                            color="blue"
                            className={styles.tag}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </Tag>
                    ))}
                </Space>
            </div>
        </Card>
    );
};
