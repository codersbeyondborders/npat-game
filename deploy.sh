#!/bin/bash

# Install dependencies
npm install

# Initialize Amplify if not already initialized
if [ ! -d "amplify" ]; then
  echo "Initializing Amplify..."
  amplify init
fi

# Add authentication
echo "Adding authentication..."
amplify add auth --service cognito \
  --serviceName nameplaceanimal \
  --usernameCaseSensitive false \
  --useDefault true

# Add API
echo "Adding API..."
amplify add api --service AppSync \
  --apiName nameplaceanimal \
  --defaultAuthType API_KEY \
  --schema src/graphql/schema.graphql

# Push changes to cloud
echo "Deploying to AWS..."
amplify push --yes

# Update environment variables
echo "Updating environment variables..."
REGION=$(aws configure get region)
API_ID=$(aws appsync list-graphql-apis --query "graphqlApis[?name=='nameplaceanimal'].apiId" --output text)
USER_POOL_ID=$(aws cognito-idp list-user-pools --max-results 10 --query "UserPools[?Name=='nameplaceanimal'].Id" --output text)
CLIENT_ID=$(aws cognito-idp list-user-pool-clients --user-pool-id $USER_POOL_ID --query "UserPoolClients[0].ClientId" --output text)

cat > .env << EOL
VITE_AWS_REGION=$REGION
VITE_USER_POOL_ID=$USER_POOL_ID
VITE_USER_POOL_CLIENT_ID=$CLIENT_ID
VITE_API_URL=https://$API_ID.appsync-api.$REGION.amazonaws.com/graphql
EOL

# Build the application
echo "Building the application..."
npm run build

# Start the development server
echo "Starting development server..."
npm run dev