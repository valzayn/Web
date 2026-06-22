import React from 'react';
import { Box, Typography, Button, Paper, styled } from '@mui/material';

const NewsContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: 'none',
    textAlign: 'center',
    '@media (min-width: 600px)': {
        flexDirection: 'row',
        textAlign: 'right',
    },
}));

const NewsContent = styled(Box)(({ theme }) => ({
    '@media (min-width: 600px)': {
        paddingRight: theme.spacing(2),
        width: '50%',
    },
    width: '100%',
    marginBottom: theme.spacing(1),
}));

const NewsImage = styled(Box)({
    width: '100%',
    '@media (min-width: 600px)': {
        width: '50%',
    },
    '& img': {
        width: '100%',
        objectFit: 'cover',
    },
});

const StyledButton = styled(Button)({
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'darkcyan',
    border: '2px solid black',
    borderRadius: '5px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'darkcyan',
        opacity: 0.9,
    },
});

interface NewsCardProps {
    title: string;
    description: string;
    image: string;
}

function NewsCard({ title, description, image }: NewsCardProps) {
    return (
        <NewsContainer elevation={0}>
            <NewsContent>
                <Typography variant="h6" component="h3" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    {description}
                </Typography>
                <StyledButton size="small">
                    Подробнее &gt;&gt;
                </StyledButton>
            </NewsContent>
            <NewsImage>
                <img src={image} alt={title} />
            </NewsImage>
        </NewsContainer>
    );
}

export default NewsCard;