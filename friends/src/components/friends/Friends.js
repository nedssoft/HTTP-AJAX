import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Friend from './Friend'
import Spinner from '../UI/Spinner/Spinner'
const initialState = {
  isLoading: false,
  friends: [],
  errorMessage: null
}

const FriendsWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default function Friends() {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const fetchData = async () => {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
      }))
      try {
        const res = await axios.get('http://localhost:5000/friendds');
        setState(prevState => ({
          ...prevState,
          friends: res.data
        }))
      } catch(err){
        debugger;
        setState(prevState => ({
          ...prevState,
          errorMessage: err.message,
        }))
      } finally{
        setState(prevState => ({
          ...prevState,
          isLoading: false
        }))
        
      }
    }
    fetchData()
  }, [])

  return (
    <FriendsWrapper>
      { state.isLoading && <Spinner />}
      { state.errorMessage && <p style={{ color: 'red'}}>{state.errorMessage}</p>}
      {state.friends && state.friends.map(friend => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </FriendsWrapper>
  )
}