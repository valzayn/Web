import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    marginBottom: theme.spacing(1),
    '&:last-child': {
        marginBottom: 0,
    },
}));

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    cardNumber: number;
}

function BuildCard({ building, cardNumber }: ComponentProps) {
    const isEven = cardNumber % 2 === 0;
    
    return (
        <Card sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            '@media (min-width: 900px)': {
                flexDirection: 'row',
            }
        }}>
            <CardMedia
                component="img"
                alt={building.title}
                image={building.img}
                sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'cover',
                    '@media (min-width: 900px)': {
                        width: 300,
                        height: 'auto',
                        order: isEven ? 1 : 0,
                    }
                }}
            />
            
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                '@media (min-width: 900px)': {
                    order: isEven ? 0 : 1,
                }
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {building.title}
                    </Typography>
                    {building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            {item}
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{ 
                    justifyContent: {
                        xs: 'flex-end',
                        md: isEven ? 'flex-start' : 'flex-end'
                    },
                    p: 2,
                    pt: 0
                }}>
                    <Button size="small" variant="outlined" color="primary">
                        Подробнее
                    </Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default BuildCard;