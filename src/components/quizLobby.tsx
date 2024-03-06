import Answer from "./answer.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Category from "./category.tsx";
import Question from "./question.tsx";
import Timer from "./timer.tsx";
import Scoreboard from "./scoreboard.tsx";
import { QuitGame, SetReady } from "../connection.ts";
import QuizResults from "./quizResults.tsx";
import Modal from "react-modal";
import { useState } from "react";
import Frame from "./frame.tsx";
import { Popover } from "react-tiny-popover";

const QuizLobby = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  const [hoverText, setHoverText] = useState("");
  const [isHoverVisible, setIsHoverVisible] = useState(false);

  const handleClick = async (isReady: boolean) => {
    await SetReady(isReady);
  };
  const handleExitClick = async () => {
    await QuitGame();
    window.location.reload();
  };

  const onClickHandler = (text: string) => {
    navigator.clipboard.writeText(quiz.invitationCode.toString());
    setHoverText(text);
  };

  const setText = (text: string) => {
    setHoverText(text);
    setIsHoverVisible(true);
  };

  return (
    <Frame big={true}>
      <Modal
        isOpen={quiz.showModal}
        closeTimeoutMS={500}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(36, 36, 36, 0.75)",
            zIndex: 30,
          },
        }}
        className={
          "flex flex-col items-center justify-center quizBorder z-40 p-2.5 overflow-hidden bg-background-grey" +
          " fixed top-[40%] bottom-1/3 left-1/4 right-1/4 laptop:left-1/3 laptop:right-1/3"
        }>
        {quiz.isGameOver && quiz.messageForPlayers == "" ? (
          <QuizResults />
        ) : (
          <p className={"text-center laptop:text-xl"}>
            {quiz.messageForPlayers + " "}
          </p>
        )}
        <div>
          {quiz.playersInSession.map((player) => {
            return (
              <div>
                {" "}
                {quiz.showModal &&
                !quiz.isGameOver &&
                player.streak >= 3 &&
                player.id == quiz.playerId ? (
                  <div className={"text-center laptop:text-xl"}>
                    {" "}
                    You are on fire!
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </Modal>
      <div
        id={"game-window-wrapper"}
        className={
          "flex flex-col h-full w-full justify-items-center items-center bg-background-grey"
        }>
        <div
          className={
            "flex flex-row flex-nowrap w-full h-[50%] align-middle items-center"
          }>
          <div className={"order-1 w-[20%] h-full"}>
            <Timer
              Countdown={quiz.timerCountdown}
              RoundNumber={quiz.roundCounter}
            />
          </div>
          <div
            id={"category-question-wrapper"}
            className={"order-2 gap-5 w-[60%] h-full "}>
            <Category name={quiz.currentCategoryName} />
            <Question Content={quiz.currentQuestionContent} />
          </div>
          <div className={"order-3 w-[20%] h-full"}>
            <Scoreboard />
          </div>
        </div>
        {quiz.currentAnswers.length > 1 ? (
          <div
            id={"answer-wrapper"}
            className={
              "flex flex-col w-full laptop:w-[25vw] h-full gap-5 justify-center align-middle items-center"
            }>
            <div
              className={
                "flex flex-col laptop:flex-row laptop:items-end w-full h-full gap-5 justify-center align-middle items-center"
              }>
              <Answer
                id={quiz.currentAnswers[0].id}
                content={quiz.currentAnswers[0].content}></Answer>
              <Answer
                id={quiz.currentAnswers[1].id}
                content={quiz.currentAnswers[1].content}></Answer>
            </div>
            <div
              className={
                "flex flex-col laptop:flex-row laptop:items-start w-full h-full gap-5 justify-center align-middle items-center"
              }>
              <Answer
                id={quiz.currentAnswers[2].id}
                content={quiz.currentAnswers[2].content}></Answer>
              <Answer
                id={quiz.currentAnswers[3].id}
                content={quiz.currentAnswers[3].content}></Answer>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          className={`flex flex-col ${quiz.roundCounter > 0 ? "hidden" : ""} w-full h-full items-center gap-5 align-middle justify-center QuizTextFont`}>
          <Popover
            content={<div>{hoverText}</div>}
            isOpen={isHoverVisible}
            positions={"top"}
            children={<p />}></Popover>
          <div
            className={
              "flex flex-col items-center text-cyan-500 TextFontSize QuizTextFont m-2 "
            }
            onClick={() => onClickHandler("Copied!")}
            onMouseEnter={() => setText("Click to copy")}
            onMouseLeave={() => setIsHoverVisible(false)}>
            {" "}
            InvitationCode
            <div className={"TextFontSize"}>{quiz.invitationCode}</div>
          </div>
          {quiz.isPlayerReady ? (
            <button
              className={
                " border-[#e03168] " +
                "border-solid border-2 hover:text-cyan-500 " +
                "rounded-lg justify-center items-center bg-background-grey p-2 text-sm laptop:text-xl " +
                "text-background-purple laptop:w-[12vw] laptop:h-[15vh] "
              }
              onClick={() => handleClick(false)}>
              I'm not ready!
            </button>
          ) : (
            <button
              className={
                " hover:border-[#22D3EE] " +
                "hover:text-cyan-500 border-solid border-2 border-cyan-400" +
                " rounded-lg justify-center items-center bg-background-grey p-2 text-sm laptop:text-xl " +
                "text-cyan-400 laptop:w-[12vw] laptop:h-[15vh] "
              }
              onClick={() => handleClick(true)}>
              I'm ready!
            </button>
          )}
          {quiz.isPlayerReady ? (
            ""
          ) : (
            <button
              className={
                " hover:border-[#e03168] flex flex-col " +
                "hover:text-background-purple border-solid border-2 border-cyan-400" +
                " rounded-lg justify-center items-center bg-background-grey p-2 text-sm laptop:text-xl " +
                "text-cyan-400 laptop:w-[12vw] laptop:h-[15vh]"
              }
              onClick={() => handleExitClick()}>
              Go back to menu
            </button>
          )}
        </div>
      </div>
    </Frame>
  );
};

export default QuizLobby;
