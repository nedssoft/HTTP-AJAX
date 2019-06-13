import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const FriendWrapper = styled.div`
  width: 300px;
  padding: 1rem;
  text-align: center;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function Friend({ friend, update, deleteFriend }) {
  return (
    <FriendWrapper>
      <p>
        <strong>{friend.name}</strong> is <strong>{friend.age}</strong> years
        old
      </p>
      <p>
        And can be contacted via <strong>{friend.email}</strong>
      </p>
      <div>
        <button onClick={() => update(friend.id)}>Update</button>
        <button onClick={() => deleteFriend(friend.id)}>Delete</button>
      </div>
    </FriendWrapper>
  );
}

Friend.propTypes = {
  friend: propTypes.objectOf(
    propTypes.oneOfType([propTypes.string, propTypes.number])
  ).isRequired
};
