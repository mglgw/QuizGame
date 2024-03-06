import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerModel, GameSessionInfo, Player, RoundModel } from "../types.ts";
import { Bounce, toast } from "react-toastify";

export interface quizSlice {
  gameMode: string;
  isGameModeSelected: boolean;
  isPlayerInLobby: boolean;

  playerNickname: string;
  invitationCode: number;
  playerId: string;
  isPlayerReady: boolean;

  currentCategoryName: string;
  currentQuestionContent: string;
  currentQuestionId: string;
  currentAnswers: AnswerModel[];
  playersInSession: Player[];
  isGameOver: boolean;
  roundCounter: number;
  timerCountdown: number;
  selectedAnswerId: string;
  visibleAnswers: boolean;
  showModal: boolean;

  warningCounter: number;

  messageForPlayers: string;
}

const initialState: quizSlice = {
  gameMode: "",
  isGameModeSelected: false,
  isPlayerInLobby: false,

  playerNickname: "",
  invitationCode: 0,
  playerId: "",
  isPlayerReady: false,

  currentCategoryName: "",
  currentQuestionContent: "",
  currentQuestionId: "",
  currentAnswers: [],
  playersInSession: [],
  isGameOver: false,
  roundCounter: 0,
  timerCountdown: 0,
  selectedAnswerId: "",
  visibleAnswers: false,
  showModal: false,

  warningCounter: 0,

  messageForPlayers: "",
};
function shuffleAnswers<AnswerModel>(array: AnswerModel[]): AnswerModel[] {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<string>) => {
      state.gameMode = action.payload;
    },
    setPlayerNickname: (state, action: PayloadAction<string>) => {
      state.playerNickname = action.payload;
    },
    setInvitationCode: (state, action: PayloadAction<number>) => {
      state.invitationCode = action.payload;
    },
    setIsGameModeSelected: (state, action: PayloadAction<boolean>) => {
      state.isGameModeSelected = action.payload;
    },
    setGameSessionInfo: (state, action: PayloadAction<GameSessionInfo>) => {
      state.playersInSession = action.payload.playersInSession;
      state.isGameOver = action.payload.isGameOver;
      state.invitationCode = action.payload.invitationCode;
      action.payload.playersInSession.map((player) =>
        player.id == state.playerId
          ? (state.isPlayerReady = player.isReady)
          : "",
      );
      state.showModal = !!state.isGameOver;
    },
    setPlayerId: (state, action: PayloadAction<string>) => {
      state.playerId = action.payload;
    },
    setIsPlayerInLobby: (state, action: PayloadAction<boolean>) => {
      state.isPlayerInLobby = action.payload;
    },
    setRoundInfo: (state, action: PayloadAction<RoundModel>) => {
      state.currentCategoryName = action.payload.categoryName;
      state.currentQuestionContent = action.payload.questionContent;
      state.roundCounter = action.payload.roundCounter;

      if (action.payload.answers != null) {
        state.currentAnswers = [];
        state.selectedAnswerId = "";
        state.currentAnswers = shuffleAnswers(action.payload.answers);
        state.showModal = false;
        state.messageForPlayers = "";
      }
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timerCountdown = action.payload;
    },
    setSelectedAnswerId: (state, action: PayloadAction<string>) => {
      state.selectedAnswerId = action.payload;
    },
    prepareLobbyForNextRound: (state, action) => {
      if (action.payload == true) {
        state.selectedAnswerId = "";
        state.visibleAnswers = false;
      }
    },
    catchError: (state, action: PayloadAction<string>) => {
      toast.warn(action.payload, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      state.warningCounter++;
    },
    changeVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibleAnswers = action.payload;
    },
    getMessageForPlayers: (state, action: PayloadAction<string>) => {
      state.messageForPlayers = action.payload;
      if (state.messageForPlayers != "") {
        state.showModal = true;
      }
    },
    prepareLobbyForNextGame: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.roundCounter = 0;
        state.currentQuestionContent = "";
        state.currentCategoryName = "";
        state.isPlayerReady = false;
        state.currentAnswers = [];
      }
    },
  },
});
export const {
  setGameMode,
  setPlayerNickname,
  setInvitationCode,
  setIsGameModeSelected,
  setGameSessionInfo,
  setPlayerId,
  setIsPlayerInLobby,
  setRoundInfo,
  setTimer,
  setSelectedAnswerId,
  prepareLobbyForNextRound,
  catchError,
  changeVisibility,
  getMessageForPlayers,
  prepareLobbyForNextGame,
} = quizSlice.actions;
