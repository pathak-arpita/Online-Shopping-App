import React, { useContext, useState } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo.png"
import { StoreContext } from "../../Contexts/StoreContext";
import { toast } from "react-toastify";

function SignUp() {
    const { setPage } = useContext(StoreContext);

    const [login, setLogin] = useState({
        name: "",

        email: "",

        password: "",
    });

    let loginData;
    if (localStorage.getItem("loginDetails") === null) {
        loginData = [];
    } else {
        loginData = JSON.parse(localStorage.getItem("loginDetails"));
    }

    const signup = (e) => {
        // e.preventDefault();
        console.log(login);
        // const initialData = {...loginData};
        loginData.push(login);
        localStorage.setItem("loginDetails", JSON.stringify(loginData));
        toast("Account is Successfully Created !!");
        setPage('login');
    };

    return (
        <Container>
            <Logo onClick={() => setPage("home")}>
            <img src={logo}  alt="img" className='brand-logo-login'/>
            </Logo>
            <form>
                <FormContainer>
                    <h3>Sign-Up</h3>

                    <InputContainer>
                        <p>FullName</p>
                        <input
                            type="text"
                            placeholder="Arpita Pathak"
                            name="name"
                            value={login.name}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }}
                        />
                    </InputContainer>
                    <InputContainer>
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="example@example.com"
                            name="email"
                            value={login.email}
                            onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }}
                        />
                    </InputContainer>
                    <InputContainer>
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="****"
                            name="password"
                            value={login.password}
                            onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }}
                        />
                    </InputContainer>
                    <SignUpButton
                        onClick={(e) => {
                            signup(e);
                        }}
                        disabled={login.name.length===0 || login.email.length===0 || login.password.length===0}
                    >
                        Create Account
                    </SignUpButton>
                </FormContainer>
            </form>
        </Container>
    );
}
const Container = styled.div`
  width: 40%;
  min-width: 450px;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 500px) {
    margin-left: -40px;
    position: fixed;
  }
`;

const Logo = styled.div`
  margin-left: 30px;
  Title {
    width: 120px;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 130%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 2px solid palevioletred;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;


export default SignUp;
