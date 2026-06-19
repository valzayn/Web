import { useParams, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { catalogFilms, newsFilms, Film } from '../data/films';

const allFilms: Film[] = [...catalogFilms, ...newsFilms];

function FilmPage() {
    const { id } = useParams<{ id: string }>();
    const index = Number(id);
    const film = allFilms[index];

    if (!film) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar active="main" />
                <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
                    <Typography variant="h4" color="error">
                        Фильм не найден
                    </Typography>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="main" />
            
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Breadcrumbs 
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                        Главная
                    </Link>
                    <Typography color="text.primary">{film.title}</Typography>
                </Breadcrumbs>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4
                    }}>
                        <Box sx={{ 
                            flex: { xs: '0 0 auto', md: '0 0 40%' },
                            maxWidth: { xs: '100%', md: '40%' }
                        }}>
                            <img 
                                src={film.image} 
                                alt={film.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'green' }}>
                                {film.title}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ textAlign: 'justify', mb: 2 }}>
                                {film.description}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
}

export default FilmPage;