import { useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const useSubscription = (
  subscription: any,
  variables: any,
  onData: (data: any) => void,
  onError?: (error: any) => void
) => {
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  useEffect(() => {
    subscriptionRef.current = client.graphql({
      query: subscription,
      variables: variables
    }).subscribe({
      next: ({ data }) => onData(data),
      error: error => {
        console.error('Subscription error:', error);
        if (onError) onError(error);
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [subscription, JSON.stringify(variables)]);
};