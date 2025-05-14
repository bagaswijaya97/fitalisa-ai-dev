import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="flex items-start w-44 -ml-7 -mt-7">
      <video
        src="/images/loading.webm" // your 60fps video
        autoPlay
        muted
        loop
        playsInline
        className="w-20 h-auto"
        style={{ display: 'block' }} // prevents default inline spacing
      />
    </div>
  );
};

export default Loading;
