import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries";
import "./index.css";
import { POST_MESSAGE } from "../../utils/mutations";

import { Input, Button } from "@chakra-ui/react";

const Messages = ({ user }) => {
  const { loading, data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });
  if (!data) {
    return null;
  }
  console.log(data);

  return (
    <div>
      {loading ? (
        <div>Loading messages</div>
      ) : (
        data.messages.map(({ _id, user: messageUser, content }) => (
          <div
            style={{
              display: "flex",
              justifyContent: user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1em",
            }}
          >
            {user !== messageUser && (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: "0.5em",
                  border: "2px solid #e5e6ea",
                  borderRadius: 25,
                  textAlign: "center",
                  fontSize: "18pt",
                  paddingTop: 5,
                }}
              >
                {messageUser.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div
              style={{
                background: user === messageUser ? "#58bf56" : "#e5e6ea",
                color: user === messageUser ? "white" : "black",
                padding: "1em",
                borderRadius: "1em",
                maxWidth: "60%",
              }}
            >
              {content}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const Chat = () => {
  const [state, stateSet] = useState({
    user: "Username",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };
  return (
    <div className="messages-container">
      <Messages user={state.user} />
      <div className="row">
        <Input
          className="message-input"
          name="user"
          value={state.user}
          onChange={(event) =>
            stateSet({
              ...state,
              user: event.target.value,
            })
          }
        ></Input>
        <Input
          className="message-input"
          name="content"
          value={state.content}
          onChange={(event) =>
            stateSet({
              ...state,
              content: event.target.value,
            })
          }
          onKeyUp={(evt) => {
            if (evt.keyCode === 13) {
              onSend();
            }
          }}
        ></Input>
        <Button
          colorScheme="blue"
          style={{ curser: "pointer" }}
          type="submit"
          mt={2}
          m
          className="btn btn-primary"
          onClick={() => onSend()}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Chat;
