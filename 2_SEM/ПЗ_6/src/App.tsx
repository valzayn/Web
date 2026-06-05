import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Catalog from './components/Catalog';
import News from './components/News';
import Footer from './components/Footer';
import { catalogFilms, newsFilms, galleryImages } from './data/films';

function App() {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
        }}>
            <Navbar active="main" />
            
            <Container maxWidth="xl" sx={{ flex: 1 }}>
                <Gallery images={galleryImages} />
                
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2.5fr 1fr' },
                    gap: 3,
                    my: 3
                }}>
                    <Catalog films={catalogFilms} />
                    <News news={newsFilms} />
                </Box>
            </Container>
            
            <Footer />
        </Box>
    );
}

export default App;