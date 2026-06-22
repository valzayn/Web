import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnswer } from '../quizSlice';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
    quizId: number;
    tasks: { question: string; answer: string }[];
}

function SortableAnswerItem({ answer }: { answer: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: answer });
    const style = { transform: CSS.Transform.toString(transform), transition };
    
    return (
        <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ListItemButton
                sx={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    cursor: 'grab',
                }}
            >
                <ListItemIcon>
                    <DragIndicatorIcon />
                </ListItemIcon>
                <ListItemText primary={answer} />
            </ListItemButton>
        </ListItem>
    );
}

function MatchingQuestion({ quizId, tasks }: Props) {
    const dispatch = useDispatch();
    const savedAnswers = useSelector((state: RootState) => state.quiz.answers[quizId] || []);
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        if (savedAnswers.length) {
            setAnswers(savedAnswers);
        } else {
            const shuffled = [...tasks.map(t => t.answer)];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setAnswers(shuffled);
            dispatch(setAnswer({ id: quizId, answer: shuffled }));
        }
    }, []);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = answers.indexOf(active.id);
            const newIndex = answers.indexOf(over.id);
            const newArray = arrayMove(answers, oldIndex, newIndex);
            setAnswers(newArray);
            dispatch(setAnswer({ id: quizId, answer: newArray }));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid size={6}>
                <List>
                    {tasks.map((task, idx) => (
                        <ListItem key={idx}>
                            <ListItemButton
                                sx={{
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    textAlign: 'right',
                                }}
                            >
                                <ListItemText primary={task.question} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>

            <Grid size={6}>
                <List>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                            {answers.map((item) => (
                                <SortableAnswerItem key={item} answer={item} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </List>
            </Grid>
        </Grid>
    );
}

export default MatchingQuestion;