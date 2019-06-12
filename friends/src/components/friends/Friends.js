import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Friend from "./Friend";
import Spinner from "../UI/Spinner/Spinner";
import FriendFrom from "./FriendForm";

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
  const addNewFriend = async newFriend => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
      errorMessage: ""
    }));
    try {
      const response = await axios.post(
        "http://localhost:5000/friends",
        newFriend
      );
      setState(prevState => ({
        ...prevState,
        friends: response.data
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
  const updateFriend = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/friends/${state.currentFriend}`,
        state.form
      );
      setState(prevState => ({
        ...prevState,
        friends: response.data
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        errorMessage: err.message
      }));
    } finally {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        form: initialForm,
        isUpdating: false
      }));
    }
  };
  const setCurrentFriend = id => {
    const currentFriend = state.friends.find(fr => fr.id === id);
    setState(prevState => ({
      ...prevState,
      isUpdating: true,
      form: {
        name: currentFriend.name,
        age: currentFriend.age,
        email: currentFriend.email
      },
      currentFriend: currentFriend.id
    }));
  };
  const inputChangeHandler = ({ target }) => {
    const targetValue = target.value;
    const targetName = target.name;
    setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [targetName]: targetValue
      }
    }));
  };
  const submitHandler = e => {
    e.preventDefault();
    if (state.isUpdating) {
      updateFriend();
    } else {
      const { email, age, name } = state.form;
      if (email && age && name) {
        addNewFriend({
          name,
          age,
          email
        });
        setState(prevState => ({
          ...prevState,
          form: initialForm
        }));
      }
    }
  };
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
              update={setCurrentFriend}
              deleteFriend={deleteFriend}
            />
          ))}
      </FriendsWrapper>
      <FriendFrom
        submitHandler={submitHandler}
        isUpdating={state.isUpdating}
        changed={inputChangeHandler}
        friend={state.form}
      />
    </FriendsContainer>
  );
}
