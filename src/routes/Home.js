import { getDownloadURL } from '@firebase/storage';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'fbase';
import React, { useState ,useEffect} from 'react';

const Home = ({userObj})=>{
    const [nweets, setNweets] = useState([]);

    useEffect(()=>{
    //onSnapshot = 데이터베이스에서 뭔가를 하게 되면 알 수 있도록 하는 코드(eventListener과 같음)
      //여기서 collection 이란 , firebase 홈페이지에서 Cloud Firestore 에 있는 최상위 collection    
    dbService.collection("nweets").onSnapshot((snapshot) =>{
            //read, delete, update 등 모두 다 포함
            //1. snapshot 을 받을 때, 배열을 만들고 
            const nweetArray = snapshot.docs.map(doc =>({
                id:doc.id, 
                ...doc.data(),
            }));
            // 2. 상태 값 nwweets 에 집어넣음 
            setNweets(nweetArray);
        });
    },[]);
    
    return(
        <div>
            <NweetFactory userObj={userObj} />
        <div>
            {/* 3.  map을 통해서 받아온 데이터 각각 확인하고 Nweet 컴포넌트를 만듦.  */}
            {nweets.map((nweet) =>( 
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>
    )
}
export default  Home;