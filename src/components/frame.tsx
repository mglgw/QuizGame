import { FC, ReactNode } from "react";

const Frame: FC<{ children: ReactNode; big?: boolean }> = ({
  children,
  big,
}) => {
  return (
    <div
      className={`h-[80vh] w-[80vw] ${big ? "laptop:w-[42vw] laptop:h-[80vh]" : "laptop:w-[75vh] laptop:h-[40vh]"}
       flex flex-col items-center justify-center quizBorder bg-background-grey`}>
      {children}
    </div>
  );
};

export default Frame;
