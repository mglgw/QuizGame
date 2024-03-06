import { useSelector } from "react-redux";
import { RootState } from "../store";

const Scoreboard = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  return (
    <div
      className={
        "flex flex-col h-full items-center justify-between select-none"
      }>
      <div className={"flex flex-col pt-5 text-xs laptop:text-lg"}>
        <span>Players</span>
        <div className={"flex flex-col items-center mt-2"}>
          {quiz.playersInSession.map((player) => {
            return (
              <div key={player.id}>
                <div
                  key={player.id}
                  className={
                    `${quiz.roundCounter != 0 ? (player.selectedAnswer != null ? "text-cyan-400 " : "text-gray-400 ") : ""}` +
                    `${quiz.roundCounter == 0 ? (player.isReady ? "text-cyan-400 " : "text-gray-400 ") : ""}`
                  }>
                  {player.streak >= 3 ? (
                    <img
                      className={"inline select-none align-bottom"}
                      alt={"On Fire!"}
                      src={"/fire-flame.gif"}
                      width={"24"}
                      height={"24"}></img>
                  ) : (
                    ""
                  )}{" "}
                  {player.name}: {player.score}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
