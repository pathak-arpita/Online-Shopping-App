import React, { useContext ,useState  } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo.png"
import { StoreContext } from "../../Contexts/StoreContext";
import { toast } from "react-toastify";

function Login() {
  const { setPage } = useContext(StoreContext);
  const [login1, setLogin] = useState({
    
    "email": "",

    "password": "",
  });


  const login = (e) => {
    e.preventDefault();
   
    const logedUser = JSON.parse(localStorage.getItem("loginDetails")).some(data => login1.email === data.email && login1.password === data.password);
    console.log(logedUser.email);
    console.log(logedUser.password);

    if(logedUser){
      setPage("home");
    }
    else{
        toast("Please Enter Valid Details");
    }
  };
  
  
  return (
    <Container>
      <Logo onClick={() => setPage("home")}>
       <img src={logo}  alt="img" className='brand-logo-login'/>
      </Logo>

      <FormContainer>
        <h3>Sign-In</h3>

        <InputContainer>
          <p>Email</p>
          <input
              type="email"
              placeholder="example@example.com"
              name="email"
              value={login1.email}
              onChange={(e) => {
                setLogin({ ...login1, [e.target.name]: e.target.value });
              }}
            />
        </InputContainer>
        <InputContainer>
          <p>Password</p>
          <input
              type="password"
              placeholder="*******"
              name="password"
              value={login1.password}
              onChange={(e) => {
                setLogin({ ...login1, [e.target.name]: e.target.value });
              }}
            />
        </InputContainer>

        <LoginButton onClick={login}>Login</LoginButton>

        <InfoText>
          By continuing, you agree to Online Shopping App's <span>Conditions of Use </span>
          and <span> Privacy Notice</span>
        </InfoText>
      </FormContainer>
      <SignUpButton onClick={() => setPage("signup")}>
        Create Account
      </SignUpButton>
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

  @media only screen and (max-width: 500px){
    margin-left:-40px;
    position:fixed;
  }
`;

const Logo = styled.div`
  margin-left: -21px;
     Title{
        width:120px;
     }
  `;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 60%;
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
      border: 1.5px solid palevioletred;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 35px;
  color:white;
  background-color: rgb(244, 51, 151);
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

const InfoText = styled.p`
  font-size: 12px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 20px;

  span {
    color: #426bc0;
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  color:white;
  background-color: rgb(244, 51, 151);
  border:none;
  
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;
export default Login;

