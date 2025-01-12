import { Amplify } from 'aws-amplify';

const config = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      signUpVerificationMethod: 'code'
    }
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_API_URL,
      region: import.meta.env.VITE_AWS_REGION,
      defaultAuthMode: 'userPool'
    }
  }
};

Amplify.configure(config);

export default config;

Amplify.configure({
  // AWS Amplify configuration will be automatically populated during build
  ssr: false
});