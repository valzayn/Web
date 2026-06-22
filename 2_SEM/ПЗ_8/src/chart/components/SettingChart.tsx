import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

type SeriesState = {
    "Максимальная высота": boolean;
    "Средняя высота": boolean;
    "Минимальная высота": boolean;
};

type SettingChartProps = {
    series: SeriesState;
    setSeries: React.Dispatch<React.SetStateAction<SeriesState>>;
    isBar: boolean;
    setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: SettingChartProps) {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
            ...series,
            [event.target.name]: event.target.checked,
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsBar(event.target.value === "bar");
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            m: '20px 0'
        }}>
            <FormControl>
                <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
                <RadioGroup
                    row
                    name="group-radio"
                    value={isBar ? "bar" : "dot"}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="bar" control={<Radio />} label="Гистограмма" />
                    <FormControlLabel value="dot" control={<Radio />} label="Линейная" />
                </RadioGroup>
            </FormControl>
            
            <FormControl>
                <FormLabel id="label-checkbox-group">На диаграмме показать:</FormLabel>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={series["Максимальная высота"]} 
                            onChange={handleCheckboxChange} 
                            name="Максимальная высота" 
                        />
                    } 
                    label="максимальный рейтинг" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={series["Средняя высота"]} 
                            onChange={handleCheckboxChange} 
                            name="Средняя высота" 
                        />
                    } 
                    label="средний рейтинг" 
                />
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={series["Минимальная высота"]} 
                            onChange={handleCheckboxChange} 
                            name="Минимальная высота" 
                        />
                    } 
                    label="минимальный рейтинг" 
                />
            </FormControl>
        </Box>
    );
}

export default SettingChart;