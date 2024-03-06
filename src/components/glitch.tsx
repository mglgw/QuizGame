import { FC } from "react";
const Glitch: FC<{ text: string; style: string }> = (props) => {
  return (
    <div className={"glitch w-full"}>
      <div className={`${props.style} select-none line`}>{props.text}</div>
      <div className={`${props.style} select-none line`}>{props.text}</div>
      <div className={`${props.style} select-none line`}>{props.text} </div>
      <div className={`${props.style} select-none line`}>{props.text} </div>
      <div className={`${props.style} select-none line`}>{props.text} </div>
      <div className={`${props.style} select-none line`}>{props.text}</div>
      <div className={`${props.style} select-none line`}>{props.text}</div>
      <div className={`${props.style} select-none line`}>{props.text} </div>
      <div className={`${props.style} select-none line`}>{props.text} </div>
    </div>
  );
};

export default Glitch;
