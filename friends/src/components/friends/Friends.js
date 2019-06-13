import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Friend from "./Friend";
import Spinner from "../UI/Spinner/Spinner";


const initialForm = {
  email: "",
  name: "",
  age: ""
};
const initialState = {
  isLoading: false,
  friends: [],
  errorMessage: null,
  currentFriend: null,
  isUpdating: false,
  form: initialForm
};

const FriendsContainer = styled.section`
  width: 800px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: auto;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const FriendsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;
export default function Friends() {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const fetchData = async () => {
      setState(prevState => ({
        ...prevState,
        isLoading: true
      }));
      try {
        const res = await axios.get("http://localhost:5000/friends");
        setState(prevState => ({
          ...prevState,
          friends: res.data
        }));
      } catch (err) {
        setState(prevState => ({
          ...prevState,
          errorMessage: err.message
        }));
      } finally {
        setState(prevState => ({
          ...prevState,
          isLoading: false
        }));
      }
    };
    fetchData();
  }, []);
  const deleteFriend = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/friends/${id}`)
      setState(prevState => ({
        ...prevState,
        friends: data
      }))
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        errorMessage: error.message
      }));
    }
  }
  return (
    <FriendsContainer>
      {state.isLoading && <Spinner />}
      {state.errorMessage && (
        <p style={{ color: "red" }}>{state.errorMessage}</p>
      )}
      <FriendsWrapper>
        {state.friends &&
          state.friends.map(friend => (
            <Friend
              key={friend.id}
              friend={friend}
              deleteFriend={deleteFriend}
            />
          ))}
      </FriendsWrapper>
    </FriendsContainer>
  );
}
