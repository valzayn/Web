import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import SettingChart from './components/SettingChart';
import { years, genres, directors, tGroup } from './groupdata';

type tSelect = "Год" | "Жанр" | "Режиссёр";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Год");
    const [groupData, setGroupData] = React.useState<tGroup>(years);
    const [isBar, setIsBar] = React.useState(true);
    const [series, setSeries] = React.useState({
        "Максимальная высота": true,
        "Средняя высота": true,
        "Минимальная высота": true,
    });

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as tSelect;
        setGroup(value);
        
        if (value === "Год") {
            setGroupData(years);
        } else if (value === "Жанр") {
            setGroupData(genres);
        } else if (value === "Режиссёр") {
            setGroupData(directors);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar active="chart" />
            
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                <Box sx={{ width: "250px", m: "20px auto" }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-group-label">Группировать по</InputLabel>
                        <Select
                            labelId="select-group-label"
                            id="select-group"
                            value={group}
                            label="Группировать по"
                            onChange={handleChange}
                        >
                            <MenuItem value="Год">Году выпуска</MenuItem>
                            <MenuItem value="Жанр">Жанру</MenuItem>
                            <MenuItem value="Режиссёр">Режиссёру</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                
                <GroupChart data={groupData} series={series} isBar={isBar} />
                <SettingChart 
                    series={series} 
                    setSeries={setSeries} 
                    isBar={isBar} 
                    setIsBar={setIsBar} 
                />
                
                <GroupGrid data={groupData} />
            </Container>
            
            <Footer />
        </Box>
    );
}

export default Chart;