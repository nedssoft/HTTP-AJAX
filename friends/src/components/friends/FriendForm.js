import React from "react";
import styled from "styled-components";

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

export default function FriendForm({
  friend,
  isUpdating,
  changed,
  submitHandler
}) {
  return (
    <FormWrapper>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          onChange={changed}
          placeholder="Name"
          value={friend.name}
        />
        <input
          type="number"
          name="age"
          onChange={changed}
          placeholder="Age"
          value={friend.age}
        />
        <input
          type="email"
          name="email"
          onChange={changed}
          placeholder="Email"
          value={friend.email}
        />
        <button>{isUpdating ? "Update" : "Add Friend"}</button>
      </form>
    </FormWrapper>
  );
}
