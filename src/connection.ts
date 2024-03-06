import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { store } from "./store";
import {
  catchError,
  changeVisibility,
  getMessageForPlayers,
  prepareLobbyForNextGame,
  prepareLobbyForNextRound,
  setGameSessionInfo,
  setPlayerId,
  setRoundInfo,
  setTimer,
} from "./store/quizSlice.ts";

const connection = new HubConnectionBuilder()
  .withUrl("HUBURL", { withCredentials: false })
  .configureLogging(LogLevel.Information)
  .build();
export async function start() {
  if (
    connection.state !== HubConnectionState.Connected &&
    connection.state !== HubConnectionState.Reconnecting
  ) {
    try {
      await connection.start();
      console.log("Connected");
    } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
    }
  }
}

connection.onclose(async () => {
  await start();
});

connection.on("SendError", (args) => {
  store.dispatch(catchError(args.toString()));
});
connection.on("SendGameSessionInfo", (args) => {
  store.dispatch(setGameSessionInfo(args));
});
connection.on("SendPlayerId", (args) => {
  store.dispatch(setPlayerId(args));
});
connection.on("SendRoundInfo", (args) => {
  store.dispatch(setRoundInfo(args));
  setTimeout(() => {
    store.dispatch(changeVisibility(true));
  }, 100);
});
connection.on("SendTimer", (args) => {
  store.dispatch(setTimer(args));
});
connection.on("SendInfoAboutRoundExpiration", (args) => {
  store.dispatch(prepareLobbyForNextRound(args));
});
connection.on("SendMessageToPlayers", (args) => {
  store.dispatch(getMessageForPlayers(args));
});
connection.on("SendInfoAboutLobbyWipe", (args) => {
  store.dispatch(prepareLobbyForNextGame(args));
});

//----------------

export async function CreateGame() {
  const currentState = store.getState();
  await connection.invoke(
    "CreateNewGameSession",
    currentState.quiz.playerNickname,
    0,
  );
}

export async function JoinGameSession() {
  const currentState = store.getState();
  await connection.invoke(
    "JoinGame",
    currentState.quiz.invitationCode,
    currentState.quiz.playerNickname,
  );
}
export async function SetReady(isReady: boolean) {
  const currentState = store.getState();
  await connection.invoke(
    "SetReadyStatus",
    currentState.quiz.playerId,
    currentState.quiz.invitationCode,
    isReady,
  );
}
export async function SendPlayerAnswer() {
  const currentState = store.getState();
  await connection.invoke(
    "SetPlayerAnswer",
    currentState.quiz.playerId,
    currentState.quiz.selectedAnswerId,
    currentState.quiz.invitationCode,
  );
}
export async function RestartGameWithSameLobby() {
  const currentState = store.getState();
  await connection.invoke(
    "RestartGameWithSameLobby",
    currentState.quiz.playerId,
    currentState.quiz.invitationCode,
  );
}
export async function QuitGame() {
  const currentState = store.getState();
  await connection.invoke(
    "QuitGame",
    currentState.quiz.playerId,
    currentState.quiz.invitationCode,
  );
}
