import { useDispatch, useSelector } from "react-redux";
import { setGameMode, setIsGameModeSelected } from "../store/quizSlice.ts";
import QuizMain from "./quizMain.tsx";
import { RootState } from "../store";
import Frame from "./frame.tsx";

const QuizGameModeSelector = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  const dispatch = useDispatch();

  function handleClick(e: string) {
    dispatch(setGameMode(e));
    dispatch(setIsGameModeSelected(true));
  }

  return (
    <div className={"z-10 relative"}>
      {quiz.isGameModeSelected ? (
        <div>
          <QuizMain />
        </div>
      ) : (
        <Frame>
          <p className={"flex flex-row text-xl mb-3.5"}>
            Start a new game or join existing lobby!
          </p>
          <div className={"mt-10 flex flex-col laptop:flex-row"}>
            <button
              className={
                "mb-5 laptop:mr-10 laptop:mb-0 w-full laptop:w-auto bg-deep-purple "
              }
              onClick={() => handleClick("new-game")}>
              New game
            </button>
            <button
              className={" w-full laptop:w-auto bg-deep-purple "}
              onClick={() => handleClick("join-game")}>
              Join game
            </button>
          </div>
        </Frame>
      )}
    </div>
  );
};

export default QuizGameModeSelector;
