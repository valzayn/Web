import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const GalleryImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block',
});

const TallImage = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block',
});

const SmallImage = styled('img')({
    width: '100%',
    height: '75px',
    objectFit: 'cover',
    display: 'block',
});

interface GalleryProps {
    images: string[];
}

function Gallery({ images }: GalleryProps) {
    const leftImages = images.slice(0, 2);
    const rightImages = images.slice(2, 5);

    return (
        <Container maxWidth="xl" sx={{ my: 2 }}>
            <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                gap: { xs: '16px', md: '0' },
            }}>
                <Box sx={{ 
                    width: { xs: '100%', md: '65%' },
                }}>
                    {leftImages.map((img, index) => (
                        <GalleryImage key={index} src={img} alt={`film ${index}`} />
                    ))}
                </Box>
                
                <Box sx={{ 
                    width: { xs: '100%', md: '35%' },
                }}>
                    {rightImages.map((img, index) => {
                        if (index === 0) {
                            return <SmallImage key={index} src={img} alt={`film ${index}`} />;
                        } else if (index === 1) {
                            return <TallImage key={index} src={img} alt={`film ${index}`} />;
                        } else {
                            return <SmallImage key={index} src={img} alt={`film ${index}`} />;
                        }
                    })}
                </Box>
            </Box>
        </Container>
    );
}

export default Gallery;