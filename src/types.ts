export interface Question {
  id: string;
  content: string;
  answers: AnswerModel[];
}

export interface CategoryModel {
  name: string;
}

export interface AnswerModel {
  id: string;
  content: string;
}
export interface RoundModel {
  id: string;
  categoryName: string;
  questionContent: string;
  roundCounter: number;
  answers: AnswerModel[];
}
export interface Player {
  id: string;
  name: string;
  score: number;
  isWinner: boolean;
  isReady: boolean;
  streak: number;
  selectedAnswer: AnswerModel;
}

export interface GameSessionInfo {
  id: string;
  invitationCode: number;
  isGameOver: boolean;
  playersInSession: Player[];
  CurrentRound: RoundModel;
}
