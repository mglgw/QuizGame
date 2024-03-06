import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setInvitationCode,
  setIsGameModeSelected,
  setIsPlayerInLobby,
  setPlayerNickname,
} from "../store/quizSlice.ts";
import { CreateGame, JoinGameSession } from "../connection.ts";
import Frame from "./frame.tsx";

const QuizLobbySelection = () => {
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const invCodeInputRef = useRef<HTMLInputElement>(null);
  const quiz = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();
  const handleNicknameChange = () => {
    dispatch(setPlayerNickname(nicknameInputRef.current?.value ?? ""));
  };

  const handleInvCodeChange = () => {
    dispatch(setInvitationCode(Number(invCodeInputRef.current?.value)));
  };

  const handleGoBackButton = () => {
    dispatch(setIsGameModeSelected(false));
  };

  const handleStartNewLobbyButton = async () => {
    await CreateGame();
    dispatch(setIsPlayerInLobby(true));
  };

  const handleJoinGameButton = async () => {
    await JoinGameSession();
    if (quiz.playerId != "") {
      await dispatch(setIsPlayerInLobby(true));
    }
  };
  return (
    <div>
      {quiz.gameMode === "new-game" ? (
        <Frame>
          <div
            className={
              "flex flex-row items-center justify-center text-xl QuizTextFont mb-[2vh]"
            }>
            Enter your nickname and let's get started!
          </div>
          <input
            type="text"
            id="playerNickname"
            onChange={handleNicknameChange}
            ref={nicknameInputRef}
            placeholder={"nickname"}
            required={true}
            className={
              "flex flex-row rounded border-solid border-2 border-cyan-400 text-center bg-deep-purple QuizTextFont"
            }
          />
          <div className={"flex flex-col laptop:flex-row mt-[2.25rem]"}>
            <button
              className={
                "mb-5 w-full laptop:w-auto laptop:mr-10 laptop:mb-0 bg-deep-purple "
              }
              onClick={handleStartNewLobbyButton}>
              {" "}
              Start new lobby!
            </button>
            <button
              className={"w-full laptop:w-auto bg-deep-purple "}
              onClick={handleGoBackButton}>
              {" "}
              Go back
            </button>
          </div>
        </Frame>
      ) : (
        <Frame>
          <div
            className={
              "flex flex-row items-center justify-center text-xl QuizTextFont mb-[2vh]"
            }>
            Enter your nickname and invitation code!
          </div>
          <input
            type="text"
            id="playerNickname"
            onChange={handleNicknameChange}
            ref={nicknameInputRef}
            placeholder={"nickname"}
            required={true}
            className={
              "flex flex-row rounded border-solid border-2 border-cyan-400 text-center bg-deep-purple mb-5  QuizTextFont"
            }></input>
          <input
            type="number"
            id="invitationCode"
            onChange={handleInvCodeChange}
            ref={invCodeInputRef}
            placeholder={"invitation code"}
            required={true}
            className={
              "flex flex-row rounded border-solid border-2 border-cyan-400 text-center bg-deep-purple QuizTextFont"
            }></input>
          <div className={"flex flex-col laptop:flex-row mt-[2.25rem]"}>
            <button
              className={
                "mb-5 w-full laptop:w-auto laptop:mr-10 laptop:mb-0 bg-deep-purple"
              }
              onClick={handleJoinGameButton}>
              Let's GO!
            </button>
            <button
              className={"w-full laptop:w-auto bg-deep-purple"}
              onClick={handleGoBackButton}>
              {" "}
              Go back
            </button>
          </div>
        </Frame>
      )}
    </div>
  );
};

export default QuizLobbySelection;
