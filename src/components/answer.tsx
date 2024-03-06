import { FC } from "react";
import { AnswerModel } from "../types.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSelectedAnswerId } from "../store/quizSlice.ts";
import { SendPlayerAnswer } from "../connection.ts";

const Answer: FC<AnswerModel> = (props) => {
  const visibleAnswers = useSelector(
    (state: RootState) => state.quiz.visibleAnswers,
  );
  const selectedAnswerId = useSelector(
    (state: RootState) => state.quiz.selectedAnswerId,
  );
  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(setSelectedAnswerId(props.id));
    await SendPlayerAnswer();
  };
  return (
    <div
      className={`flex w-full h-full laptop:w-[12vw] laptop:h-[15vh] border-solid border-2 border-cyan-400 rounded-lg justify-center items-center bg-background-grey select-none transition ease-in-out ${
        visibleAnswers ? "opacity-100" : "opacity-0"
      }
            ${selectedAnswerId == "" ? "hover:border-[#e03168] hover:text-background-purple" : "text-cyan-400 "}
            ${selectedAnswerId == props.id ? " scale-110 transition ease-in-out delay-150" : ""}
            ${selectedAnswerId != "" && selectedAnswerId != props.id ? " scale-75 transition ease-in-out delay-150 blur-sm hover:blur-0 hover:border-[#e03168] hover:text-background-purple" : ""}`}
      onClick={handleClick}>
      <div className={"filter-none text-sm laptop:text-xl "}>
        {props.content}
      </div>
    </div>
  );
};

export default Answer;
