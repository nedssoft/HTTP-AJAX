import React, {useState} from 'react';
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
const initialState = {
  form: {
    name: '',
    email: '',
    age: ''
  }
}
export default function FriendForm({ addFriend, isUpdating }) {
  const [state, setState] = useState(initialState)

   const inputChangeHandler = ({ target }) => {
     const targetValue = target.value;
     const targetName = target.name;
     setState(prevState => ({
       ...prevState,
       form: {
         ...prevState.form,
         [targetName]: targetValue
       }
     }))
     
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const { email, age, name } = state.form;
    if ( email && age && name) {
      addFriend({
        name,
        age,
        email
      })
      setState(initialState)
    }
  }
   
  return (
    <FormWrapper>
    <form onSubmit={submitHandler}>
    <input type="text" name="name"  onChange={inputChangeHandler}  placeholder="Name"  value={state.form.name}/>
    <input type="number" name="age" onChange={inputChangeHandler}   placeholder="Age"  value={state.form.age}/>
    <input type="email" name="email" onChange={inputChangeHandler}  placeholder="Email" value={state.form.email}/>
    <button>
      { isUpdating ? 'Update': 'Add Friend'}
    </button>
    </form>
    </FormWrapper>
  )
}
