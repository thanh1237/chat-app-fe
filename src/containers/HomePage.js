import PaginationBar from "components/PaginationBar";
import SearchForm from "components/SearchForm";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/actions/auth.actions";
import conversationActions from "redux/actions/conversation.actions";
import { userActions } from "redux/actions/user.actions";

export const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const listOfUsers = useSelector((state) => state.user.users);
  const totalPageNum = useSelector((state) => state.user.totalPageNum);
  const [key, setKey] = useState("conversations");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [message, setMessage] = useState("");
  const [globalMessages, setGlobalMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [selectedConversation, setSelectedConversation] = useState({
  //   type: conversationTypes.GLOBAL,
  // })
  // const totalPageNum = 10;

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setQuery("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
    dispatch(userActions.usersRequest(searchInput));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleClickFriend = () => {
    console.log("handleClickFriend");
  };

  const handleClickConversation = () => {
    console.log("handleClickConversation");
  };

  const handleSendMessage = () => {
    console.log("handleSendMessage");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(authActions.getCurrentUser());
    }
    dispatch(conversationActions.getConversations());
    dispatch(userActions.usersRequest());
  }, [dispatch]);
  return (
    <div id="home">
      <div className="home-title">
        <div className="title">Global Room</div>
        <div className="online-users">0 user online</div>
      </div>
      <div className="home-boxes">
        <div className="left-box">
          <div className="contain">
            <div className="search">
              <SearchForm
                loading={loading}
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="select">
              <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="conversations" title="Conversations">
                  <div>GLOBAL ROOM</div>
                </Tab>
                <Tab eventKey="users" title="Users">
                  <div className="users">
                    {listOfUsers &&
                      listOfUsers.map((user) => {
                        return (
                          <div
                            key={user.id}
                            className="user"
                            onClick={handleClickFriend}
                          >
                            <img src={user.avatarUrl} alt="userImage" />
                            <div className="user-name">{user.name}</div>
                          </div>
                        );
                      })}
                  </div>
                </Tab>
              </Tabs>
            </div>
            <div className="pagination1">
              <PaginationBar
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
              />
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="conversations">Conversations</div>
          <div className="input">
            <Form onSubmit={handleSubmit} className="mess">
              <Form.Group>
                <Form.Control
                  type="message"
                  placeholder="Say Something..."
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
                {/* {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )} */}
              </Form.Group>
            </Form>

            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
