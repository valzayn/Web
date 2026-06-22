import films from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function FilmsGrid() {
    const rows: GridRowsProp = films;
    
    const columns: GridColDef[] = [
        { field: 'Название', headerName: 'Название', flex: 1.5 },
        { field: 'Год', flex: 0.5 },
        { field: 'Режиссёр', flex: 1 },
        { field: 'Жанр', flex: 0.8 },
        { field: 'Рейтинг', flex: 0.5 },
        { field: 'Страна', flex: 0.8 },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: '600px', mt: '20px' }}>
            <DataGrid 
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                showToolbar={true}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'Рейтинг', sort: 'desc' }],
                    },
                }}
            />
        </Container>
    );
}

export default FilmsGrid;