import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTasks } from "../quizData";
import SortableList from './SortableList';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
    index: number;
    tasks: tTasks;
}

function Matching({ index, tasks }: ComponentProps) {
    const dispatch = useDispatch();
    const currentList = useSelector((state: RootState) => state.lists.lists[index]);
    
    const shuffledAnswers = useMemo(() => {
        const answers = tasks.map(item => item.answer);
        const shuffled = [...answers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [tasks]);

    useEffect(() => {
        if (!currentList) {
            dispatch(addList({ index, items: shuffledAnswers }));
        }
    }, [dispatch, index, shuffledAnswers, currentList]);

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}
                            >
                                <ListItemText primary={item.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                <SortableList index={index} answers={shuffledAnswers} />
            </Grid>
        </Grid>
    );
}

export default Matching;