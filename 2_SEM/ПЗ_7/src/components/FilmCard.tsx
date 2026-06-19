import React from 'react';
import { Link } from 'react-router-dom';
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
    cursor: 'pointer',
});

const MoreButton = styled(Button)({
    color: 'rgb(178, 139, 60)',
    fontSize: '16px',
    textTransform: 'none',
    padding: 0,
    minWidth: 'auto',
    display: 'inline-block',
    '&:hover': { 
        backgroundColor: 'transparent',
        textDecoration: 'underline'
    }
});

interface FilmCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    borderColor?: 'pink' | 'brown' | 'blue' | 'yellow';
    imagePosition?: 'top' | 'bottom';
}

function FilmCard({ id, title, description, image, borderColor, imagePosition = 'top' }: FilmCardProps) {
    const isImageTop = imagePosition === 'top';
    const filmLink = `/film/${id - 1}`;
    
    return (
        <StyledCard bordercolor={borderColor}>
            {isImageTop && (
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Link to={filmLink} style={{ textDecoration: 'none' }}>
                        <FilmImage src={image} alt={title} />
                    </Link>
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
                    <Link to={filmLink} style={{ textDecoration: 'none' }}>
                        <FilmImage src={image} alt={title} />
                    </Link>
                </Box>
            )}
            
            <Box sx={{ textAlign: 'right' }}>
                <Link to={filmLink} style={{ textDecoration: 'none' }}>
                    <MoreButton>
                        Подробнее &gt;&gt;
                    </MoreButton>
                </Link>
            </Box>
        </StyledCard>
    );
}

export default FilmCard;