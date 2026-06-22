import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
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

function SortableItem({ item, index }: { item: string; index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item });
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
                <ListItemText primary={`${index + 1}. ${item}`} />
            </ListItemButton>
        </ListItem>
    );
}

function SortQuestion({ quizId, tasks }: Props) {
    const dispatch = useDispatch();
    const savedAnswers = useSelector((state: RootState) => state.quiz.answers[quizId] || []);
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        if (savedAnswers.length) {
            setItems(savedAnswers);
        } else {
            const shuffled = [...tasks.map(t => t.question)];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setItems(shuffled);
            dispatch(setAnswer({ id: quizId, answer: shuffled }));
        }
    }, []);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            const newArray = arrayMove(items, oldIndex, newIndex);
            setItems(newArray);
            dispatch(setAnswer({ id: quizId, answer: newArray }));
        }
    };

    return (
        <List>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((item, idx) => (
                        <SortableItem key={item} item={item} index={idx} />
                    ))}
                </SortableContext>
            </DndContext>
        </List>
    );
}

export default SortQuestion;