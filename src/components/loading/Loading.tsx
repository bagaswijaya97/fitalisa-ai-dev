import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex items-start w-20 -ml-6 -mt-5">
      <video src="/images/loading.webm" autoPlay loop muted playsInline />
    </div>
  );
};

export default Loading;
