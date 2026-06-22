import React, { useState } from 'react';
import { 
    FormControl, 
    FormControlLabel, 
    Radio, 
    RadioGroup, 
    Checkbox, 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText,
    ListItemIcon
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnswer } from '../quizSlice';

interface Props {
    quizId: number;
    tasks: { question: string; answer: string }[];
    multiple?: boolean;
}

function ChoiceQuestion({ quizId, tasks, multiple = false }: Props) {
    const dispatch = useDispatch();
    const savedAnswers = useSelector((state: RootState) => state.quiz.answers[quizId] || []);
    const [selected, setSelected] = useState<string[]>(savedAnswers);

    const handleChange = (value: string) => {
        let newSelected: string[];
        if (multiple) {
            newSelected = selected.includes(value)
                ? selected.filter(v => v !== value)
                : [...selected, value];
        } else {
            newSelected = [value];
        }
        setSelected(newSelected);
        dispatch(setAnswer({ id: quizId, answer: newSelected }));
    };

    return (
        <Box>
            {multiple ? (
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.question} disablePadding>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    mb: 1,
                                }}
                                onClick={() => handleChange(task.question)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={selected.includes(task.question)}
                                        edge="start"
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={task.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.question} disablePadding>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    mb: 1,
                                }}
                                onClick={() => handleChange(task.question)}
                                selected={selected.includes(task.question)}
                            >
                                <ListItemIcon>
                                    <Radio
                                        checked={selected.includes(task.question)}
                                        edge="start"
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={task.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default ChoiceQuestion;