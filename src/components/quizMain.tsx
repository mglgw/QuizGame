import { useSelector } from "react-redux";
import { RootState } from "../store";
import QuizLobbySelection from "./quizLobbySelection.tsx";
import QuizLobby from "./quizLobby.tsx";
import Modal from "react-modal";
Modal.setAppElement("#root");

const QuizMain = () => {
  const quiz = useSelector((state: RootState) => state.quiz);

  return (
    <div>{quiz.playerId != "" ? <QuizLobby /> : <QuizLobbySelection />}</div>
  );
};

export default QuizMain;
