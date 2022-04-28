import { dbService, storageService } from "fbase";
import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Nweet from "./Nweet";


// nweets 생성 담당하는 컴포넌트=============================
const NweetFactory = ({ userObj }) => {
 const [nweet, setNweet] = useState("");
 const [attachment, setAttachment] = useState("");
 const onSubmit = async (event) => {
  event.preventDefault();
  let attachmentURL = "";
  if (attachment !== "") {
   const attachmentRef = storageService
    .ref()
    .child(`${userObj.uid}/${uuidv4()}`);
   const response = await attachmentRef.putString(attachment, "data_url");
   attachmentURL = await response.ref.getDownloadURL();
  }
  const nweetObj = {
   text: nweet, //현재 이 nweet은 state의 상태 값 nweet 임
   createdAt: Date.now(),
   creatorId: userObj.uid,
   attachmentURL,
  };
  await dbService.collection("nweets").add(nweetObj);
  setNweet("");
  setAttachment("");
 };
 const onChange = (event) => {
  const {
   target: { value },
  } = event; //'event'로부터 라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라고 하는 것
  setNweet(value);
 };
 const onFileChange = (event) => {
  const {
   target: { files },
  } = event; //event 안으로 가서 파일을 받아 오는 것을 의미 함.
  const theFile = files[0]; //파일은 하나마 넣을 거임
  const reader = new FileReader(); // 파일을 갖고 reader를 만든 다음
  reader.onloadend = (finishedEvent) => {
   //onloadend 에 finsnihedEvent의 result 를 SetAttachment로 설정함
   const {
    currentTarget: { result },
   } = finishedEvent;
   setAttachment(result);
  };
  reader.readAsDataURL(theFile); //readAsDateURL 을 사용해서 파일을 읽는다.
 };
 const onClearAttachment = () => {
  setAttachment(null);
 };
 return (
  <form onSubmit={onSubmit}>
   <input
    type="text"
    value={nweet}
    onChange={onChange}
    placeholder="What's on your mind?"
    maxLength={120}
   />
   <input type="file" accept="image/*" onChange={onFileChange} />
   <input type="submit" value="Nweet" />
   {attachment && (
    <div>
     <img src={attachment} width="500px" height="500px" />
     <button onClick={onClearAttachment}>Clear</button>
    </div>
   )}
  </form>
 );
};

export default NweetFactory;
