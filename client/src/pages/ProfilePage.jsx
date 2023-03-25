import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const Singleuser = await axios.get(`http://localhost:5000/user/${id}`);
      console.log("data loading...");
      setUser(Singleuser.data);
    };
    getUser();
  }, [id]);

  console.log(user.blogPosts);

  return (
    <div>
      <CoverImage>
        <img src={user.profile} alt="" />
      </CoverImage>

      <ProfileSection>
        <ProfileUser>
          <ProfileImage>
            <img src={user.profile} alt="" />
          </ProfileImage>
          <UserInfo>
            <h3>{user.name}</h3>
            <p>{user.profesion}</p>
          </UserInfo>
        </ProfileUser>

        <Infos>
          <UserPosts>
            {user.blogPosts ? (
              user.blogPosts.map((post) => (
                <NavLink>
                  <Post>
                    <img src={post.photo} alt="" />
                    <h1>{post.title}</h1>
                  </Post>
                </NavLink>
              ))
            ) : (
              <p>Loading posts...</p>
            )}
          </UserPosts>
          <Followers>
            {user.followers ? (
              user.followers.map((user) => (
                <NavLink>
                  <Post>
                    {/* <img src={user.profile} alt="" /> */}
                    <h1>{user.name}</h1>
                  </Post>
                </NavLink>
              ))
            ) : (
              <p>Loading posts...</p>
            )}
          </Followers>
          <Following>
            {user.following ? (
              user.following.map((user) => (
                <NavLink>
                  <Post>
                    {/* <img src={user.profile} alt="" /> */}
                    <h1>{user.name}</h1>
                  </Post>
                </NavLink>
              ))
            ) : (
              <p>Loading posts...</p>
            )}
          </Following>
        </Infos>
      </ProfileSection>
    </div>
  );
}
const UserPosts = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:.1rem;
  height:70vh;
  width:500px;
  place-self:center;
  padding:.4rem;
  padding-bottom:4rem;
  overflow:auto;
`
const Post = styled.div`
  width:400px;
  margin-bottom:1rem;
  border-radius:10px;
  overflow:hidden;
  box-shadow: 0 6px 13px rgba(0,0,0,.1);
  >{
    margin: 0;
  }

  h1{
    font-size: .9rem;
    font-weight: 400;
    padding: 1rem;
    margin-bottom: 0;
  }
  >img{
    width:100%;
    height:300px;
  }
`
const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;
const ProfileUser = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  max-height:250px;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #ffffff;
  position: absolute;
  z-index: 2;
  top: 8rem;

  > img {
    width: 100%;
  }
`;
const UserInfo = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #706d6d;
  }
  > * {
    margin: 0;
  }
`;
const CoverImage = styled.div`
  background-color: #eee;
  width: 100%;
  overflow: hidden;
  height: 100px;

  > img {
    width: 100%;
  }
`;

const Infos = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Followers = styled.div`
  background-color: red;
`;
const Following = styled.div`
  background-color:red;
`