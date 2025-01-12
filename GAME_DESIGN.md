# Name, Place, Animal, Thing Game Design

## Overview
A React-based implementation of the classic "Name, Place, Animal, Thing" game where players must quickly come up with words starting with a randomly selected letter.

## Components Structure

### 1. Game Container (GameContainer.tsx)
- Manages overall game state
- Handles timer logic
- Controls game flow (start, end, reset)
- Manages random letter generation
- Props: none
- State:
  - currentLetter: string
  - timeRemaining: number
  - gameStatus: 'waiting' | 'playing' | 'finished'
  - score: number

### 2. Input Form (InputForm.tsx)
- Collects user input for all categories
- Validates input against current letter
- Props:
  - currentLetter: string
  - onSubmit: (answers: GameAnswers) => void
  - disabled: boolean
- State:
  - formData: {name: string, place: string, animal: string, thing: string}

### 3. Timer Component (Timer.tsx)
- Displays countdown timer
- Props:
  - timeRemaining: number
  - isActive: boolean

### 4. Score Display (ScoreDisplay.tsx)
- Shows final score and breakdown
- Props:
  - answers: GameAnswers
  - score: number
  - validationResults: ValidationResults

## Data Types

```typescript
interface GameAnswers {
  name: string;
  place: string;
  animal: string;
  thing: string;
}

interface ValidationResults {
  name: boolean;
  place: boolean;
  animal: boolean;
  thing: boolean;
}

interface GameState {
  currentLetter: string;
  timeRemaining: number;
  gameStatus: 'waiting' | 'playing' | 'finished';
  answers: GameAnswers;
  score: number;
  validationResults: ValidationResults;
}
```

## Game Flow

1. Start Screen
   - Shows game title and rules
   - "Start Game" button

2. Game Play
   - Displays random letter
   - Shows 60-second countdown timer
   - Input fields for Name, Place, Animal, Thing
   - Submit button (can be clicked before timer ends)

3. End Screen
   - Shows submitted answers
   - Displays validation results
   - Shows score breakdown
   - "Play Again" button

## Scoring System

- Base points for valid answers:
  - Each valid word: 10 points
  - Additional point per letter in the word
  - All categories filled correctly: 10 bonus points
  - Early submission bonus: 1 point for each remaining second

## Validation Rules

1. Words must start with the given letter
2. Minimum length: 2 characters
3. Only alphabetic characters allowed (spaces permitted for places)
4. Case-insensitive comparison

## Future Enhancements

1. Multiplayer support
2. Dictionary validation
3. Category-specific word lists
4. Difficulty levels
5. High scores leaderboard
6. Time bonus modifiers

## Technical Considerations

1. State Management
   - Use React's useState and useEffect for local state
   - Consider Context API for global state if needed

2. Timer Implementation
   - Use setInterval for countdown
   - Cleanup with useEffect

3. Input Validation
   - Real-time validation feedback
   - Prevent submission of empty fields

4. Accessibility
   - Keyboard navigation
   - Screen reader support
   - Clear error messages

5. Responsive Design
   - Mobile-first approach
   - Flexible layout for different screen sizes