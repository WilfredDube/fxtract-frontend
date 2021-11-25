import { useEffect, useRef, useState } from "react";

const url = "ws://localhost:8000/api/user/ws";

const makeSocket = () => {
  const skt = new WebSocket(url);
  return skt;
};

export function useSocket() {
  const ws = useRef(null);
  const [response, setResponse] = useState({});
  const [socket, setSocket] = useState({});

  useEffect(() => {
    ws.current = makeSocket();

    ws.current.onmessage = (msg) => {
      var res = JSON.parse(msg.data);

      setResponse(res);
    };

    ws.current.onerror = (err) => {
      ws.current = null;
      setTimeout(() => {
        ws.current = makeSocket();
      }, 5000);
    };

    setSocket(ws.current);

    return () => {
      ws.current.close();
    };
  }, []);

  return { socket, response, setResponse };
}
