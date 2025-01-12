# AWS Amplify Application Setup Guide

This guide will help you set up and deploy your AWS Amplify application for the Name, Place, Animal, Thing game.

## Prerequisites

1. Install required tools:
```bash
npm install -g @aws-amplify/cli
```

2. Configure AWS Amplify CLI:
```bash
amplify configure
```

Follow the prompts to create an IAM user and configure your credentials.

## Project Setup

1. Initialize Amplify in your project:
```bash
amplify init
```

2. Push the backend configuration:
```bash
amplify push
```

This will create the following resources:
- AppSync GraphQL API
- DynamoDB tables for Player, Game, GameRound, and Answer
- Authentication setup

## Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in your project root with:
```
VITE_AWS_REGION=your-region
VITE_USER_POOL_ID=your-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-user-pool-client-id
VITE_API_URL=your-appsync-api-url
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to AWS Amplify:
```bash
amplify publish
```

## Testing

1. Create test users:
```bash
aws cognito-idp sign-up \
  --client-id YOUR_CLIENT_ID \
  --username testuser@example.com \
  --password YourPassword123! \
  --user-attributes Name=email,Value=testuser@example.com
```

2. Verify the test user:
```bash
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id YOUR_USER_POOL_ID \
  --username testuser@example.com
```

## Troubleshooting

Common issues and solutions:

1. GraphQL API errors:
   - Check your API authorization settings in AppSync
   - Verify your schema deployment with `amplify api gql-compile`

2. Authentication issues:
   - Ensure Cognito User Pool is properly configured
   - Check client-side authentication configuration

3. Deployment failures:
   - Run `amplify status` to check resource status
   - Review CloudWatch logs for detailed error messages

## Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [GraphQL API Reference](https://docs.amplify.aws/cli/graphql/overview/)
- [Authentication Guide](https://docs.amplify.aws/lib/auth/getting-started/)