export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      mode
      status
      currentLetter
      currentRound
      maxPlayers
      timeLimit
      players {
        items {
          id
          username
          gamesPlayed
          gamesWon
          highScore
          totalScore
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mode
        status
        currentLetter
        currentRound
        maxPlayers
        timeLimit
        players {
          items {
            id
            username
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard(
    $gameMode: String!
    $limit: Int
  ) {
    listPlayers(
      filter: { gamesPlayed: { gt: 0 } }
      limit: $limit
      sortField: "highScore"
      sortDirection: "DESC"
    ) {
      items {
        id
        username
        gamesPlayed
        gamesWon
        highScore
        totalScore
      }
    }
  }
`;