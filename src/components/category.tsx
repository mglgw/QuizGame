import { FC } from "react";
import { CategoryModel } from "../types.ts";

const Category: FC<CategoryModel> = (props) => {
  return (
    <div
      className={
        "flex laptop:h-[15vh] border-b-2 border-solid border-cyan-400 rounded-bl-xl rounded-br-xl justify-center items-center" +
        " flex-none bg-background-grey select-none laptop:text-xl "
      }>
      {props.name == "" ? (
        <div className={"p-3"}>
          You are about to face a series of questions with various categories.{" "}
          <div>
            Each round multiplies points you can score with correct answer.
          </div>{" "}
          Good luck!
        </div>
      ) : (
        props.name
      )}
    </div>
  );
};

export default Category;
