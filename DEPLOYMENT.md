# Deployment Guide

## Prerequisites

1. Install AWS CLI and configure credentials:
```bash
aws configure
```

2. Install Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

## Quick Start

1. Make the deployment script executable:
```bash
chmod +x deploy.sh
```

2. Run the deployment script:
```bash
./deploy.sh
```

## Manual Setup

If you prefer to set up manually:

1. Initialize Amplify:
```bash
amplify init
```

2. Add authentication:
```bash
amplify add auth
```

3. Add API:
```bash
amplify add api
```

4. Push changes:
```bash
amplify push
```

5. Configure environment variables:
Create a `.env` file with:
```
VITE_AWS_REGION=your-region
VITE_USER_POOL_ID=your-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-user-pool-client-id
VITE_API_URL=your-appsync-api-url
```

6. Build and run:
```bash
npm run build
npm run dev
```

## Testing

1. Create a test user:
```bash
aws cognito-idp sign-up \
  --client-id $(aws cognito-idp list-user-pool-clients --user-pool-id your-user-pool-id --query "UserPoolClients[0].ClientId" --output text) \
  --username test@example.com \
  --password Test123! \
  --user-attributes Name=email,Value=test@example.com
```

2. Create a test game:
```bash
aws appsync post-graphql \
  --api-id your-api-id \
  --query 'mutation { createGame(input: { mode: "MULTI", status: "WAITING", currentRound: 1, maxPlayers: 4, timeLimit: 60 }) { id } }'
```

## Troubleshooting

1. If authentication fails:
- Check Cognito User Pool settings
- Verify environment variables
- Ensure user is confirmed

2. If API calls fail:
- Check AppSync API settings
- Verify GraphQL schema deployment
- Check authorization settings