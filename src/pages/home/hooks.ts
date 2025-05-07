import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

export interface MessageType {
  id: string;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  image?: File | null;
}

interface MyResponseType {
  url: string;
  options: RequestInit;
  refreshTokenFn: () => Promise<string>;
  tokenKey: string;
  loadingMessage: MessageType
}

export const useHome = () => {
  const [query, setQuery] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatTopRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<File | null>();
  const [engine, setEngine] = useState<number>(0);
  const [token, setToken] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && query !== "") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "30px";
      }
      handleGetPrompt();
    }
  };

  useEffect(() => {
    if (messages.length <= 2) {
      chatTopRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (image) {
      objectUrl = URL.createObjectURL(image);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleGetPrompt = async (suggestion?: string) => {
    if (textareaRef.current) {
      textareaRef.current.blur();
    }
    setIsFirstLoad(false);
    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      isUser: true,
      text: suggestion ? suggestion : query,
      image: image,
    };

    const loadingId = crypto.randomUUID();
    const loadingMessage: MessageType = {
      id: loadingId,
      isUser: false,
      text: "...",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setQuery("");
    setImage(null);

    let res;
    if (!image) {
      fetchData(
        "https://ftmobile.inhealth.co.id/livia-ai/api/Gemini/text-only",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: suggestion ? suggestion : query, }),
        },
        loadingMessage);
    } else {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("prompt", suggestion ? suggestion : query);

      fetchData(
        "https://ftmobile.inhealth.co.id/livia-ai/api/Gemini/text-and-image",
        {
          method: "POST",
          headers: {
          },
          body: formData,
        },
        loadingMessage);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
          e.preventDefault(); // optional, to stop the image blob from going into the textarea
        }
      }
    }
  };

  async function fetchWithAuthRetry<T>(
    url: string,
    options: RequestInit,
    refreshTokenFn: () => Promise<string>,
    loadingMessage: MessageType,
    tokenKey: string = "auth_token"
  ): Promise<T> {
    // Get token from localStorage or regenerate if missing
    let token = localStorage.getItem(tokenKey);

    if (!token) {
      token = await refreshTokenFn();
      localStorage.setItem(tokenKey, token);
    }

    // Attach token to headers
    const withAuth = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await fetch(url, withAuth);

      if (res.status === 401) throw new Error("Unauthorized");

      if (!res.ok) {
        throw new Error(`Fetch failed with status: ${res.status}`);
      }

      return await res.json();
    } catch (err: any) {
      // Handle token expiration
      if (err.message === "Unauthorized") {
        try {
          const newToken = await refreshTokenFn();
          console.log(newToken)
          localStorage.setItem(tokenKey, newToken);

          const retryOptions = {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };

          const retryRes = await fetch(url, retryOptions);
          if (!retryRes.ok) {
            throw new Error(`Retry failed with status: ${retryRes.status}`);
          }

          return await retryRes.json();
        } catch (refreshErr) {
          throw refreshErr;
        }
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMessage.id
              ? { ...m, text: "Something went wrong.", isLoading: false }
              : m
          )
        );
        throw err;
      }
    }
  }

  const fetchData = async (url: string, headers: any, loadingMessage: MessageType) => {
    const data: any = await fetchWithAuthRetry<MyResponseType>(
      url,
      headers,
      async () => {
        const res = await fetch(
          `https://ftmobile.inhealth.co.id/livia-ai/api/AuthToken/SW5pIGFkYWxhaCBrdW5jaSByYWhhc2lhLCB5YW5nIHN1ZGFoIGRpIGVua3JpcHNpIG1lbmdndW5ha2FuIGJhc2U2NC4gVG9sb25nIGRpamFnYSBiYWlrLWJhaWsgeWFhLg==`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to generate token");
        const json = await res.json();
        console.log(json)
        return json.data.token;
      },
      loadingMessage
    );
    setMessages((prev) =>
      prev.map((m) =>
        m.id === loadingMessage.id
          ? { ...m, image: image, text: data.data.html, isLoading: false }
          : m
      )
    );
  };


  // useEffect(() => {
  //   const getNewToken = async () => {
  //     let res;
  //     res = await fetch(
  //       `https://ftmobile.inhealth.co.id/livia-ai/api/AuthToken/SW5pIGFkYWxhaCBrdW5jaSByYWhhc2lhLCB5YW5nIHN1ZGFoIGRpIGVua3JpcHNpIG1lbmdndW5ha2FuIGJhc2U2NC4gVG9sb25nIGRpamFnYSBiYWlrLWJhaWsgeWFhLg==`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     setToken(data.data.token);
  //   };
  //   getNewToken();
  // }, []);

  return {
    textareaRef,
    chatTopRef,
    query,
    isFirstLoad,
    messages,
    handleInput,
    handleKeyDown,
    handleGetPrompt,
    chatEndRef,
    image,
    setImage,
    handlePaste,
    engine_index: engine,
    setEngine,
    fetchData
  };
};
