import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RestartGameWithSameLobby } from "../connection.ts";

const QuizResults = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  return (
    <div>
      <div className={"flex flex-col items-center justify-center select-none"}>
        <div
          className={
            "EndGameLogoFont flex flex-row text-center text-sm laptop:pb-4"
          }>
          Game Over!{" "}
        </div>
        <p className={"flex flex-row text-center text-sm laptop:text-lg"}>
          Congratulations!
        </p>
        {quiz.playersInSession.map((player) => {
          return (
            <div key={player.id}>
              {player.isWinner ? (
                <div className={"pb-2 text-sm text-center flex flex-row"}>
                  {player.name} with score {player.score}!
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <div className={"flex flex-col laptop:flex-row "}>
          <button
            className={"laptop:w-auto laptop:mr-10 "}
            onClick={() => RestartGameWithSameLobby()}>
            Play Again
          </button>
          <button onClick={() => window.location.reload()}>Main Menu</button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
