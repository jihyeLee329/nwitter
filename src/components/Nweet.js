import { dbService } from 'fbase';
import React,{useState} from 'react'

const Nweet = ({nweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDeleteClick =()=>{
        const ok = window.confirm("Are you sure you want delete this nweet?");
        console.log(ok)
        if(ok) {
            //delete
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }
    const toggleEditing = ()=>{
        setEditing(prev=>!prev);
    }
    const onSubmit = async (event)=>{
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false)
    }
    const onChange =(event)=>{
        const {target:{value},} = event;
        setNewNweet(value);
    }
    return (
        <div>
            {editing ?
            <>
                {isOwner && <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={newNweet} type="text" placeholder='Edit your nweet' required/>
                    <input type="submit" value="Update Nweet" />
                </form> 
                <button onClick={toggleEditing}>Cancle</button>
                </>
                }
            </>
            :
            <>
                <h4>{nweetObj.text}</h4>
                {isOwner &&
                <> 
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
                }
            </>
            }
        </div>
    );
}
export default Nweet;