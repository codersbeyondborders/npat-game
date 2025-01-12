export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($id: ID!) {
    onUpdateGame(id: $id) {
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

export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($gameRoundId: ID!) {
    onCreateAnswer(gameRoundId: $gameRoundId) {
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