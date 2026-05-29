import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BuildCard from './BuildCard';
import structures from "../data";

const cardData = [structures[3], structures[6], structures[9], structures[7]];

function Content() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
                {cardData.map((item, index) => (
                    <Grid key={index} size={{ xs: 12, md: 6 }}>
                        <BuildCard 
                            building={item} 
                            cardNumber={index}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Content;