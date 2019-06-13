import React, { useState } from "react";
import styled from "styled-components";
import Spinner from '../UI/Spinner/Spinner'
import axios from 'axios'

const FormWrapper = styled.div`
  width: 400px;
  padding: 1rem;
  margin: 1rem auto;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input,
    button {
      padding: 0.8rem;
      margin: 0.5rem auto;
      outline: none;
      border-radius: 6px;
      width: 80%;
      border: 1px solid #ccc;
    }
    button {
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
  }
`;

const initialState = {
  form: {
    email: "",
    name: "",
    age: ""
  }
};
export default function FriendForm({ history }) {

  const [state, setState ] = useState(initialState);
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
      history.push('/')
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
        form: initialState,
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
          form: {...initialState.form }
        }));
      }
    }
  };
  return (
    <FormWrapper>
      {state.isLoading && <Spinner />}
      {state.errorMessage && <p style={{color: 'red'}}>{state.errorMessage}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          onChange={inputChangeHandler}
          placeholder="Name"
          value={state.form.name}
        />
        <input
          type="number"
          name="age"
          onChange={inputChangeHandler}
          placeholder="Age"
          value={state.form.age}
        />
        <input
          type="email"
          name="email"
          onChange={inputChangeHandler}
          placeholder="Email"
          value={state.form.email}
        />
        { /*<button>{isUpdating ? "Update" : "Add Friend" </button>*/}
        <button>Add Friend</button>
      </form>
    </FormWrapper>
  );
}
