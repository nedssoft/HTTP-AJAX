import React, {useState, useEffect } from 'react';
import styled from 'styled-components'

const FormWrapper = styled.div`
  width: 400px;
  padding: 1rem;
  margin: 1rem auto;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(204,204,204,1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(204,204,204,1);
  box-shadow: 0px 0px 5px 0px rgba(204,204,204,1);
  form {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    input, button {
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
`
const intitalState = {
  form: {
    name: '',
    email: '',
    age: ''
  }
}
export default function FriendForm({ addFriend }) {
  const [state, setState] = useState(intitalState)

   const inputChangeHandler = (e) => {
    console.log(e.target.value)
  }
  const submitHandler = () => {

  }
  return (
    <FormWrapper>
    <form >
    <input type="text" name="name"  onChange={inputChangeHandler}  placeholder="Name"/>
    <input type="number" name="age" onChange={inputChangeHandler}   placeholder="age"/>
    <input type="email" name="email" onChange={inputChangeHandler}  placeholder="Email"/>
    <button>Add Friend</button>
    </form>
    </FormWrapper>
  )
}
