import { useEffect, useRef, useState } from "react";

const url = "ws://localhost:8000/api/user/ws";

// let skt = null;
const makeSocket = () => {
  // if (skt === null) {
  const skt = new WebSocket(url);
  // }
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
      // console.log("Error: ", err);
    };

    setSocket(ws.current);

    return () => {
      ws.current.close();
    };
  }, []);

  return { socket, response, setResponse };
}
