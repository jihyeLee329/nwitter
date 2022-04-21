import { dbService } from 'fbase';
import React, { useState ,useEffect} from 'react';

const Home = ({userObj})=>{
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async ()=>{
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document)=>{
            const nweetObject = {
                ...document.data(),
                id:document.id,
            }
            setNweets(prev=> 
                //set~~에 함수사용하게 되면, 이전 값에 접근 가능
                [nweetObject, ...prev]);
        });
    }
    useEffect(()=>{
        getNweets();

    //onSnapshot = 데이터베이스에서 뭔가를 하게 되면 알 수 있도록 하는 코드
    dbService.collection("nweets").onSnapshot(snapshot =>{
        console.log("somethin happend");
        //read, delete, update 등 모두 다 포함
    })
    },[]);
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet, //현재 이 nweet은 state의 상태 값 nweet 임 
            createdAt : Date.now(),
            creatorId:userObj.uid
        });
        setNweet("");
    }
    const onChange = (event) =>{
        const{
            target : {value},
        } = event; //'event'로부터 라는 의미. 즉, event 안에 있는 target 안에 있는 value를 달라고 하는 것
        setNweet(value);
    }
    return(
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={nweet} onChange={onChange}placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value="Nweet" />
        </form>
        <div>
            {nweets.map((nweet) =>( 
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>
            ))}
        </div>
    </div>
    )
}
export default  Home;