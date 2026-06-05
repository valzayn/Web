import React from 'react';
import { Box } from '@mui/material';
import FilmCard from './FilmCard';
import { Film } from '../data/films';

interface CatalogProps {
    films: Film[];
}

function Catalog({ films }: CatalogProps) {
    return (
        <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr'
            },
            gap: '10px',
            alignContent: 'start'
        }}>
            {films.map((film) => (
                <FilmCard
                    key={film.id}
                    title={film.title}
                    description={film.description}
                    image={film.image}
                    borderColor={film.borderColor}
                    imagePosition={film.imagePosition}
                />
            ))}
        </Box>
    );
}

export default Catalog;