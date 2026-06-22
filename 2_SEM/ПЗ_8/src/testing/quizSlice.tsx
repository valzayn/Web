import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    answers: {
        [key: number]: string[];
    };
    results: {
        [key: number]: number;
    };
    showResults: boolean;
}

const initialState: QuizState = {
    answers: {},
    results: {},
    showResults: false,
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setAnswer: (state, action: PayloadAction<{ id: number; answer: string[] }>) => {
            state.answers[action.payload.id] = action.payload.answer;
        },
        setResults: (state, action: PayloadAction<{ id: number; correct: number }>) => {
            state.results[action.payload.id] = action.payload.correct;
        },
        setShowResults: (state, action: PayloadAction<boolean>) => {
            state.showResults = action.payload;
        },
        resetQuiz: (state) => {
            state.answers = {};
            state.results = {};
            state.showResults = false;
        },
    },
});

export const { setAnswer, setResults, setShowResults, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;