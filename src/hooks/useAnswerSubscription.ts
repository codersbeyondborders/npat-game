import { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';

interface Answer {
  id: string;
  gameRoundId: string;
  playerId: string;
  name: string;
  place: string;
  animal: string;
  thing: string;
  isValid: boolean;
  score: number;
  submittedAt: string;
}

export const useAnswerSubscription = (
  gameRoundId: string,
  onNewAnswer: (answer: Answer) => void
) => {
  useEffect(() => {
    if (!gameRoundId) return;

    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateAnswer, { gameRoundId })
    ).subscribe({
      next: ({ value }: any) => {
        const newAnswer = value.data.onCreateAnswer;
        onNewAnswer(newAnswer);
      },
      error: error => console.error('Error subscribing to answers:', error)
    });

    return () => subscription.unsubscribe();
  }, [gameRoundId, onNewAnswer]);
};