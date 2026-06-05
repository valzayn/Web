import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewsCard from './NewsCard';
import { Film } from '../data/films';

const NewsContainer = styled(Box)({
    borderLeft: '2px solid rgb(178, 139, 60)',
    paddingLeft: '30px',
    '@media (max-width: 900px)': {
        borderLeft: 'none',
        paddingLeft: 0,
        marginTop: '20px',
    },
});

interface NewsProps {
    news: Film[];
}

function News({ news }: NewsProps) {
    return (
        <NewsContainer>
            {news.map((item) => (
                <NewsCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                />
            ))}
        </NewsContainer>
    );
}

export default News;