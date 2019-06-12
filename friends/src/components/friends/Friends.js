import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'

const initialState = {
  isLoading: false,
  friends: []
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
        const res = await axios.get('http://localhost:5000/friends');
        console.log(res.data)
        setState(prevState => ({
          ...prevState,
          friends: res.data
        }))
      } catch(err){
        console.log(err)
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

    </FriendsWrapper>
  )
}