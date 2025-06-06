import ChatBox from "../../components/chat-box/ChatBox";
import { ArrowUp, Info, Square, X } from "lucide-react";
import { useHome } from "./hooks";
import AttachButton from "../../components/attach-button/AttachButton";
import Dropdown from "../../components/dropdown/Dropdown";
import { list_suggestions_1, list_suggestions_2 } from "../../constants";
import InfoDrawer from "../../components/drawer-info/InfoDrawer";

const Home = () => {
  const {
    textareaRef,
    query,
    isFirstLoad,
    messages,
    handleInput,
    handleKeyDown,
    handleGetPrompt,
    chatEndRef,
    chatTopRef,
    image,
    setImage,
    handlePaste,
    engine_index,
    setEngine,
    handleFocus,
    isLoading,
    saveFile,
    topics,
    showModal,
    toggleDrawer
  } = useHome();

  return (
    <section className="fixed inset-0 flex justify-center">
      <section className="relative w-full flex flex-col md:max-w-[740px] bg-white">
        <div ref={chatTopRef} />
        <div className="absolute top-4 left-4 font-semibold flex items-center gap-3">
          <Dropdown engine_index={engine_index} setEngine={setEngine} />
          <Info className="text-[#509EE3] w-5" onClick={() => {
            toggleDrawer();
          }}/>
        </div>
        <section
          className={`flex-1 overflow-y-auto w-full flex flex-col items-center justify-start px-5`}
        >
          {!isFirstLoad && (
            <section className="w-full flex items-center justify-center px-2 md:max-w-[780px]">
              <ChatBox messages={messages} />
            </section>
          )}
          <div ref={chatEndRef} />
          <div
            className={`absolute bottom-0 left-0 pb-7 right-0 bg-white flex flex-col items-center justify-center gap-6 w-full px-5 md:max-w-[780px]`}
          >
            {isFirstLoad && (
              <section className="w-full md:max-w-[780px] mb-5 flex flex-col items-start justify-center">
                <div>
                  <img src="/images/livia.png" alt="" className="w-32" />
                  <h1 className="mt-3 bg-gradient-to-r text-transparent inline-block bg-clip-text from-[#2D7FCA] via-[#9C51DA] to-[#CB6E7A] font-semibold">
                    <span onClick={saveFile} className="text-xl sm:text-2xl">Hi, Aku Livia!</span>
                    <br />
                    <span className="text-[16px]">
                      Kamu bisa tanya aku apa saja terkait <br />
                      kesehatan, gizi, atau gaya hidup sehat.
                    </span>
                  </h1>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-3 max-w-fit mt-4">
                  {topics && topics.map((topic, index) => (
                    <div
                      key={index}
                      onClick={() => handleGetPrompt(topic)}
                      className="text-center cursor-pointer border rounded-full text-xs py-1 px-2 border-[#8ABEEC] text-[#8ABEEC]"
                      style={{
                        flexBasis: index < 3 ? "auto" : "auto", // all items auto width
                      }}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div
              className="shadow-sm relative pb-12 p-5 bg-[#FBFCFF] border-[#ededed] border -mt-5
        w-full max-w-[740px] rounded-3xl min-h-[90px] focus:outline-0 text-sm placeholder:text-sm"
            >
              {image && (
                <div className="mb-2">
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="max-h-16 rounded-xl border object-cover border-gray-300"
                    />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute -top-1 -right-1 border border-[#aeaeae] bg-white text-[#212121] rounded-full p-1"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              )}
              <textarea
                ref={textareaRef}
                disabled={isLoading}
                onInput={handleInput}
                value={query}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleFocus}
                rows={1}
                onPaste={handlePaste}
                placeholder="Tanya Livia"
                className="outline-none focus:outline-none min-h-[30px] resize-none overflow-hidden text-[16px] transition-all duration-200  w-full bg-transparent placeholder:text-[#a3a3a3]"
              />
              {messages.length >= 2 &&
                messages[messages.length - 1].isLoading ? (
                <>
                  <Square
                    size={32}
                    className={`bg-[#e8e8e8] transition-all duration-50 
                absolute right-3 bottom-3 text-black rounded-full p-2  shadow-md`}
                  />
                </>
              ) : (
                <button
                  onClick={() => {
                    handleGetPrompt();
                  }}
                  className="inline-flex absolute right-3 bottom-3 gap-2 border bg-[#284F71] rounded-full hover:bg-white hover:shadow-md transition-all p-1 items-center text-sm font-medium"
                >
                  <ArrowUp size={18} className="text-white" />
                </button>
              )}
              <div className="absolute left-3 bottom-2">
                <AttachButton onFileChange={setImage} />
              </div>
            </div>
          </div>
        </section>
      </section>
      <InfoDrawer closeModal={toggleDrawer} modalActive={showModal} />
    </section>
  );
};

export default Home;
