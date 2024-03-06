import { FC } from "react";

const Question: FC<{ Content: string }> = (props) => {
  return (
    <div className={"h-[80%]"}>
      {props.Content == "" ? (
        ""
      ) : (
        <div
          className={
            "flex h-full laptop:h-[20vh] border-2 border-t border-solid border-cyan-400 rounded-xl shadow-lg shadow-cyan-400 justify-center items-center select-none bg-background-grey p-2"
          }>
          <div className={"flex justify-center items-center laptop:text-xl "}>
            {props.Content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
