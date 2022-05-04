import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
 const navigate = useNavigate();
 const [newDisplayName, setDisplayName] = useState(userObj.displayName);

 const onLogOutClick = () => {
  authService.signOut();
  navigate("/");
 };
 const getMyNweets = async () => {
  // where 은 필터링하는 방법을 알려줌
  // 원하나면, 결과를 어떤 순서에 따라 피렅링 할 수 있따. = orderBy('기준키값');
  // where 에서는 어쩌고 저쩌고 필터링 하는데, orderBy 에서는 정렬하기 때문에 에러가 남.  fireStore 은 noSQL 기반 DB라서 몇몇 기능은 이렇게 작동될 수 없음.
  // 해당 쿼리에는 index가 필요함 = pre-made query 를 만들어야 한다는 뜻. 이거 사용할 거라고 데이타베이스에게 알려줘야 함
  //에러가 나면, 쿼리 만들어 주는 링크를 걸어주고, 그 링크 클릭하면 인덱스 만들어주는 페이지로 이동 함.

  const nweets = await dbService
   .collection("nweets")
   .where("creatorId", "==", userObj.uid)
   .orderBy("createdAt")
   .get(); //orderBy(키값, 정렬 순서) "desc" or  "asc"
  console.log(nweets.docs.map((doc) => doc.data()));
 };
 useEffect(() => {
  getMyNweets();
 }, []);
 const onChange = (e) => {
  const {
   target: { value },
  } = e;
  setDisplayName(value);
 };
 const onSubmit = async (e) => {
  // fireStore 에서 collection(users라 불리는)은
  // 유저에 대해 아이디 하나당 도뮤컨트 하나만 생성 가능

  e.preventDefault();
  if (userObj.displayName !== newDisplayName) {
   //파이어 베이스 콘솔에서 Authentication 에 유저를 두고
   // fireStore에 다른 콜렉션을 만들고, 이 콜렉션은 유저 프로필을 가질거임
   await updateProfile(authService.currentUser, {
    displayName: newDisplayName,
   });
   refreshUser();
  }
 };

 return (
  <>
   <div className="container">
    <form onSubmit={onSubmit} className="profileForm">
     <input
      onChange={onChange}
      type="text"
      autoFocus
      placeholder="Display name"
      value={newDisplayName}
      className="formInput"
     />
     <input
      type="submit"
      value="Update Profile"
      className="formBtn"
      style={{
       marginTop: 10,
      }}
     />
    </form>
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
     Log Out
    </span>
   </div>
  </>
 );
};
export default Profile;
