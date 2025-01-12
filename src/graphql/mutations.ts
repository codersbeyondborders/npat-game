export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
  ) {
    createGame(input: $input) {
      id
      mode
      status
      currentLetter
      currentRound
      maxPlayers
      timeLimit
      createdAt
      updatedAt
    }
  }
`;

export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
  ) {
    updateGame(input: $input) {
      id
      mode
      status
      currentLetter
      currentRound
      maxPlayers
      timeLimit
      createdAt
      updatedAt
    }
  }
`;

export const createGameRound = /* GraphQL */ `
  mutation CreateGameRound(
    $input: CreateGameRoundInput!
  ) {
    createGameRound(input: $input) {
      id
      gameId
      roundNumber
      letter
      startTime
      endTime
    }
  }
`;

export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
  ) {
    createAnswer(input: $input) {
      id
      gameRoundId
      playerId
      name
      place
      animal
      thing
      isValid
      score
      submittedAt
    }
  }
`;