import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Friend from './Friend'
import Spinner from '../UI/Spinner/Spinner'
import FriendFrom from './FriendForm'

const initialState = {
  isLoading: false,
  friends: [],
  errorMessage: null,
  currentFriend: null,
  isUpdating: false,
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
    setState(prevState => ({
      ...prevState,
      isLoading: true,
      errorMessage:''
    }))
    try {
      const response = await axios.post('http://localhost:5000/friends', newFriend)
        setState(prevState =>({
       ...prevState,
       friends: response.data
     }))
    } catch(err) {
      setState(prevState => ({
        ...prevState,
        errorMessage: err.message,
      }))
    } finally {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }))
    }
   }
   const setCurrentFriend = (id) => {
    const currentFriend = state.friends.find(fr => fr.id === id)
    setState(prevState => ({
      ...prevState,
      isUpdating: true,
      currentFriend
    }))
   }
  return (
    <FriendsContainer>
      { state.isLoading && <Spinner />}
      { state.errorMessage && <p style={{ color: 'red'}}>{state.errorMessage}</p>}
      <FriendsWrapper>
        {state.friends && state.friends.map(friend => (
          <Friend key={friend.id} friend={friend}  update={setCurrentFriend}/>
        ))}
      </FriendsWrapper>
      <FriendFrom  addFriend={addNewFriend} isUpdating={state.isUpdating} />
    </FriendsContainer>
  )
}