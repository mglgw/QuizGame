import { FC } from "react";

const Timer: FC<{ Countdown: number; RoundNumber: number }> = (props) => {
  return (
    <div
      className={"flex flex-col pt-5 justify-center items-center select-none"}>
      <div
        className={
          "flex flex-col justify-center items-center portfolio-experiment laptop:text-lg"
        }>
        Time Left
        <div
          className={
            `${props.Countdown < 5 ? "text-background-purple " : ""}` +
            "flex flex-col laptop:pt-5 experiment-title laptop:text-xl "
          }>
          {props.Countdown > 0 ? props.Countdown : ""}
        </div>
      </div>
      <div className={"flex flex-row text-sm laptop:text-lg"}>
        Round {props.RoundNumber}{" "}
      </div>
    </div>
  );
};

export default Timer;
