import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import { tGroup } from '../groupdata';
import Box from '@mui/material/Box';

type ChartProps = {
    data: tGroup;
    series: {
        "Максимальная высота": boolean;
        "Средняя высота": boolean;
        "Минимальная высота": boolean;
    };
    isBar: boolean;
};

const chartSetting = {
    height: 350,
    sx: {
        '& .MuiChartsAxis-label': {
            transform: 'translateX(-10px)',
        },
    },
    yAxis: [{
        label: 'Рейтинг',
    }],
};

function GroupChart({ data, series, isBar }: ChartProps) {
    const seriesArray: { dataKey: string; label: string }[] = [
        ...(series["Максимальная высота"] ? [{
            dataKey: 'Максимальная высота',
            label: 'Максимальный рейтинг',
        }] : []),
        ...(series["Средняя высота"] ? [{
            dataKey: 'Средняя высота',
            label: 'Средний рейтинг',
        }] : []),
        ...(series["Минимальная высота"] ? [{
            dataKey: 'Минимальная высота',
            label: 'Минимальный рейтинг',
        }] : []),
    ];

    const showBarLabel = seriesArray.length === 1;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ height: 350 }}>
                {isBar ? (
                    <BarChart
                        dataset={data}
                        xAxis={[{ 
                            scaleType: 'band', 
                            dataKey: 'Группа',
                            label: 'Группа',
                        }]}
                        series={seriesArray.map(s => ({
                            dataKey: s.dataKey,
                            label: s.label,
                            ...(showBarLabel ? { barLabel: 'value' as const } : {}),
                        }))}
                        slotProps={{
                            legend: {
                                position: { vertical: 'bottom', horizontal: 'center' },
                            },
                        }}
                        {...chartSetting}
                    />
                ) : (
                    <LineChart
                        dataset={data}
                        xAxis={[{ 
                            scaleType: 'band', 
                            dataKey: 'Группа',
                            label: 'Группа',
                        }]}
                        series={seriesArray}
                        slotProps={{
                            legend: {
                                position: { vertical: 'bottom', horizontal: 'center' },
                            },
                        }}
                        {...chartSetting}
                    />
                )}
            </Box>
        </Container>
    );
}

export default GroupChart;