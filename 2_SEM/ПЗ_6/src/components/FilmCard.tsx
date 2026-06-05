import React from 'react';
import { Card, Typography, Button, Box, styled } from '@mui/material';

const borderColors = {
    pink: '#ffb6c1',
    brown: '#a52a2a',
    blue: '#0000ff',
    yellow: '#ffff00',
};

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'bordercolor',
})<{ bordercolor?: string }>(({ bordercolor }) => ({
    borderRadius: '20px',
    padding: '16px',
    border: `2px solid ${bordercolor ? borderColors[bordercolor as keyof typeof borderColors] : 'grey'}`,
    boxShadow: 'none',
}));

const FilmImage = styled('img')({
    width: '40%',
    objectFit: 'cover',
    borderRadius: '30px',
    display: 'block',
    margin: '0 auto',
});

const MoreButton = styled(Button)({
    color: 'rgb(178, 139, 60)',
    fontSize: '16px',
    textTransform: 'none',
    padding: 0,
    minWidth: 'auto',
    display: 'block',
    '&:hover': { 
        backgroundColor: 'transparent',
        textDecoration: 'underline'
    }
});

interface FilmCardProps {
    title: string;
    description: string;
    image: string;
    borderColor?: 'pink' | 'brown' | 'blue' | 'yellow';
    imagePosition?: 'top' | 'bottom';
}

function FilmCard({ title, description, image, borderColor, imagePosition = 'top' }: FilmCardProps) {
    const isImageTop = imagePosition === 'top';
    
    return (
        <StyledCard bordercolor={borderColor}>
            {isImageTop && (
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <FilmImage src={image} alt={title} />
                </Box>
            )}
            
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 0.5, fontSize: '1.3rem' }}>
                {title}
            </Typography>
            
            <Typography variant="body2" sx={{ textAlign: 'justify', mb: 1 }}>
                {description}
            </Typography>
            
            {!isImageTop && (
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <FilmImage src={image} alt={title} />
                </Box>
            )}
            
            <MoreButton href="#">
                Подробнее &gt;&gt;
            </MoreButton>
        </StyledCard>
    );
}

export default FilmCard;