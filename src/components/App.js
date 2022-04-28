import React,{useEffect, useState} from 'react'
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //변화가 있는지 onAuthStateChanged 얘가 듣고 있음. addEventListener 역할
      if (user) {

        // 첫 번쨰 방법
        // setUserObj({
        //   displayName : user.displayName,
        //   uid: user.uid,
        //   updateProfile:(args) => user.updateProfile(user, { displayName: user.displayName }), //현재 이 fn 은 우리가 원하는 fn을 얻기위한 중간 fn
        // });

        // 두 번째 방법
        setUserObj(user)
      } else{
        setUserObj(null)
      }
      setInit(true);
    });
  }, []);
  const refreshUser = ()=>{
    const user = authService.currentUser;

    // 첫 번째 방법
    setUserObj({
      displayName : user.displayName,
      uid: user.uid,
      updateProfile:(args) => user.updateProfile(user, { displayName: user.displayName }), //현재 이 fn 은 우리가 원하는 fn을 얻기위한 중간 fn
    });

    // 두 번째 방법
    // 비어있는 object 에서 새로운 object 로 => user 라는 원래의 사본이 새 object의 형태로 생성
    // 그럼 리액트는 어 ! 새로운 object가 생겼네? 하면서 다시 렌더링 함 /
    // assign 은 에러같은 문제가 있어서 첫 번쨰 방법으로 하자
    // setUserObj(Object.assign({},user));
  }

  return (
    <>
      {init ? <AppRouter /*isLoggedIn={isLoggedIn}*/refreshUser={refreshUser} isLoggedIn={Boolean(userObj)}  userObj={userObj}/> : "Initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()} Twitter</footer> */}
    </>
  );
}

export default App;
