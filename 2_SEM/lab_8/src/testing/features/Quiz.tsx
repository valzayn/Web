import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from "../quizData";
import Matching from './Matching';
import { useDispatch, useSelector } from 'react-redux';
import { setShowResults, resetAll, setResults } from './quizSlice';
import { RootState } from '../../store';

function Quiz() {
    const dispatch = useDispatch();
    const showResults = useSelector((state: RootState) => state.lists.showResults);
    const results = useSelector((state: RootState) => state.lists.results);
    const lists = useSelector((state: RootState) => state.lists.lists);

    const handleCheck = () => {
        quiz.forEach((item, index) => {
            const list = lists[index];
            if (list) {
                let correct = 0;
                item.tasks.forEach((task, idx) => {
                    if (list[idx] === task.answer) {
                        correct++;
                    }
                });
                dispatch(setResults({ index, total: item.tasks.length, correct }));
            }
        });
        dispatch(setShowResults(true));
    };

    const handleReset = () => {
        dispatch(resetAll());
    };

    const getFullyCorrectCount = () => {
        let count = 0;
        quiz.forEach((item, index) => {
            const total = item.tasks.length;
            const correct = results[index]?.correct || 0;
            if (correct === total) {
                count++;
            }
        });
        return count;
    };

    return (
        <Container maxWidth="md">
            {quiz.map((item, index) => (
                <Box key={item.id} component="section" sx={{ m: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>
                    <Matching index={index} tasks={item.tasks} />
                </Box>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                <Button variant="contained" onClick={handleCheck}>
                    Проверить
                </Button>
                <Button variant="contained" onClick={handleReset}>
                    Начать снова
                </Button>
            </Box>

            {showResults && (
                <Box sx={{ mt: 4, p: 3}}>
                    <Typography variant="h5" gutterBottom align="center">
                        Результаты теста
                    </Typography>
                    {quiz.map((item, index) => (
                        <Typography key={item.id} align="center" variant="body1" sx={{ mt: 1 }}>
                            Задание {index + 1}. {results[index]?.correct === results[index]?.total 
                                ? 'Все ответы верные.' 
                                : `Верных ответов: ${results[index]?.correct || 0}.`}
                        </Typography>
                    ))}
                    
                    <Typography variant="body1" align="center" >
                        Верных заданий: {getFullyCorrectCount()}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default Quiz;