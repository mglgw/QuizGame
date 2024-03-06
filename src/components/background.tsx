const Background = () => {
  return (
    <div
      id={"background"}
      className={"w-screen h-screen left-0 top-0 z-0 fixed backgroundStart"}>
      <div className={"absolute bottom-0 w-screen h-[50vh] backgroundWrapper"}>
        <div className={"backgroundDiv"}></div>
      </div>
    </div>
  );
};

export default Background;
