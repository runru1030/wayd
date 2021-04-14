import AuthForm from "components/AuthForm";
import { authService, dbService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons"; import { useEffect, useState } from "react";
;
const Auth = () => {


    const onSocialClick = async (event) => {
        const { target: { name }, } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);

    }
    return (

        <div class="Container">

            <img id="logo" src="logo.png" width="150px" />

            <AuthForm />
            <hr />
            <span>소셜 계정으로 로그인</span>
            <div class="authBtns">
                <button onClick={onSocialClick} name="google" ><FontAwesomeIcon icon={faGoogle} /> </button>
                <button onClick={onSocialClick} name="github"><FontAwesomeIcon icon={faGithub} /></button>
            </div>

        </div>

    );
};
export default Auth;