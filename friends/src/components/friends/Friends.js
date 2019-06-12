import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Friend from './Friend'
import Spinner from '../UI/Spinner/Spinner'
import FriendFrom from './FriendForm'

const initialState = {
  isLoading: false,
  friends: [],
  errorMessage: null
}

const FriendsContainer = styled.section`
  width: 800px;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: auto;
  flex-direction: column;
`
const FriendsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
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
        const res = await axios.get('http://localhost:5000/friends');
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
  const addNewFriend = async (newFriend) => {
  
    try {
      const response = await axios.post('http://localhost:5000/friends', newFriend)
        setState(prevState =>({
       ...prevState,
       friends: response.data
     }))
    } catch(err) {

    } finally {

    }
   }

  return (
    <FriendsContainer>
      { state.isLoading && <Spinner />}
      { state.errorMessage && <p style={{ color: 'red'}}>{state.errorMessage}</p>}
      <FriendsWrapper>
        {state.friends && state.friends.map(friend => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </FriendsWrapper>
      <FriendFrom  addFriend={addNewFriend}/>
    </FriendsContainer>
  )
}