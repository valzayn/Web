import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setShowResults, resetQuiz, setResults } from '../quizSlice';
import { quiz } from '../quizData';
import MatchingQuestion from './MatchingQuestion';
import SortQuestion from './SortQuestion';
import ChoiceQuestion from './ChoiceQuestion';

function Quiz() {
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.quiz.answers);
    const showResults = useSelector((state: RootState) => state.quiz.showResults);
    const results = useSelector((state: RootState) => state.quiz.results);

    const handleCheck = () => {
        quiz.forEach((q) => {
            const userAnswers = answers[q.id] || [];
            let correct = 0;
            
            if (q.type === 'M' || q.type === 'S') {
                q.tasks.forEach((task, index) => {
                    if (userAnswers[index] === task.answer) {
                        correct++;
                    }
                });
            } else if (q.type === 'C') {
                q.tasks.forEach((task) => {
                    if (task.answer === 'true' && userAnswers.includes(task.question)) {
                        correct = 1;
                    }
                });
            } else if (q.type === 'MC') {
                const correctAnswers = q.tasks.filter(t => t.answer === 'true').map(t => t.question);
                const selectedCorrect = userAnswers.filter(a => correctAnswers.includes(a));
                correct = selectedCorrect.length;
            }
            
            dispatch(setResults({ id: q.id, correct }));
        });
        dispatch(setShowResults(true));
    };

    const handleReset = () => {
        dispatch(resetQuiz());
    };

    const renderQuestion = (q: typeof quiz[0]) => {
        switch (q.type) {
            case 'M':
                return <MatchingQuestion quizId={q.id} tasks={q.tasks} />;
            case 'S':
                return <SortQuestion quizId={q.id} tasks={q.tasks} />;
            case 'C':
                return <ChoiceQuestion quizId={q.id} tasks={q.tasks} multiple={false} />;
            case 'MC':
                return <ChoiceQuestion quizId={q.id} tasks={q.tasks} multiple={true} />;
            default:
                return null;
        }
    };

    const getMaxScore = (q: typeof quiz[0]) => {
        if (q.type === 'M' || q.type === 'S') {
            return q.tasks.length;
        } else if (q.type === 'C') {
            return 1;
        } else if (q.type === 'MC') {
            return q.tasks.filter(t => t.answer === 'true').length;
        }
        return 0;
    };

    return (
        <Box>
            {quiz.map((q) => (
                <Box key={q.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        {q.id}. {q.title}
                    </Typography>
                    {renderQuestion(q)}
                </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button variant="contained" onClick={handleCheck}>
                    Проверить
                </Button>
                <Button variant="contained" onClick={handleReset}>
                    Начать снова
                </Button>
            </Box>

            {showResults && (
                <Box sx={{ mt: 3, p: 3}}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Результаты теста
                    </Typography>
                    {quiz.map((q) => {
                        const maxScore = getMaxScore(q);
                        const score = results[q.id] !== undefined ? results[q.id] : 0;
                        return (
                            <Typography align="center" key={q.id}>
                                Задание {q.id}. {score === maxScore ? 'Все ответы верные.' : `Верных ответов: ${score}.`}
                            </Typography>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}

export default Quiz;