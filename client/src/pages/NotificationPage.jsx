import React from "react";
import styled from "styled-components";


export default function (props) {

  return (
    <>
      <Backdrop>
        <NotificationBoard>
          <div>Notifications</div>
          <div>
            {props.notifications.map((notify) => (
              <Notification>
                <div>
                  <div>
                    <img src={notify.sender.profile} alt="" />
                  </div>
                  <div>
                    <p>{notify.sender.name}</p>
                  </div>
                </div>
              </Notification>
            ))}
          </div>
        </NotificationBoard>
      </Backdrop>
    </>
  );
}

const Notification = styled.div`
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 1rem;

    >div:nth-child(1){
        width:50px;
        height:50px;
        border-radius:50%;
        overflow:hidden;
        >img{
            width:100%;
        }
    }
}
`;

const NotificationBoard = styled.div`
  background-color:white;
  width: 40vw;
  height: 70vh;
  box-shadow:0 7px 20px rgba(0,0,0,.2)
`;
const Backdrop = styled.div`
  display: grid;
  place-items: center;
  z-index:10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
`;
