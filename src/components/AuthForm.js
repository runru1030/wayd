import { authService, dbService } from 'fbase';
import React, { useState } from 'react';

const AuthForm=()=>{
    const [authObj, setAuthObj]=useState({
        displayName:"",
        name:"",
        email:"",
        password:"",
        instagramId:"",
    });
    const [newAccount, setNewAccount]=useState("");
    const [error, setError]=useState("");
    const onChange =  (event) =>{
        const {target: {name, value}}=event;
        setAuthObj(authObj=>({...authObj, [name]:value}))
    };

    const onSubmit =async(event) =>{
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await  authService.createUserWithEmailAndPassword(authObj.email, authObj.password);
                await dbService.collection("User_Profile").add(authObj);
           
            }else{
                data = await authService.signInWithEmailAndPassword(authObj.email, authObj.password);
            }
        }
        catch(error){
            setError(error.message);
        }
        
    };

    const toggleAccount =()=> setNewAccount(prev =>!prev);
    
    return(
        <>
            <form class="authForm" onSubmit={onSubmit}>

                  {newAccount ? (<>
                    <div>
                        <span>Email</span>
                        <input name ="email" type="text" placeholder="Email Adress" required value={authObj.email} onChange={onChange}/>
                    </div>
                    <div>
                        <span>PassWord</span>
                        <input name ="password" type="password" placeholder="6자리 이상 입력해주세요." required value={authObj.password} onChange={onChange}/>
                    
                    </div>
                    <div>
                        <span>Display Name</span>
                        <input name ="displayName" type="text" placeholder="Display Name" required value={authObj.displayName} onChange={onChange} />
                    
                    </div>
                    <div>
                        <span>Name</span>
                        <input name ="name" type="text" placeholder="Name" required value={authObj.name} onChange={onChange} />
                    
                    </div>
                    <div>
                        <span>Instagram's ID</span>
                        <input  name ="instagramId" type="text" placeholder="선택 사항" value={authObj.instagramId}onChange={onChange} />
                
                    </div>
                </>):
                    (<>
                        <input name ="email" type="text" placeholder="Email" required value={authObj.email} onChange={onChange}/>
                        <input name ="password" type="password" placeholder="PassWord" required value={authObj.password} onChange={onChange}/>
              
                    </>)
                }
                <input type="submit" id="submitBtn" value={newAccount? "회원가입": "로그인"} />
                
                 <span id="error">{error}</span>
            </form>
            <button  id="switchBtn"onClick={toggleAccount}>{newAccount ? "로그인": "회원가입"}</button>
             


        </>
    );
}
export default AuthForm;