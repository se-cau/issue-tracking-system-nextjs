import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=K2D:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');


* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}


a {
  color: inherit;
  text-decoration: none;
}

button {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
text-decoration: none;
cursor: pointer;

height: 40px;
background-color: black;
color: white;
border: 0;
border-radius: 10px;
box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

}

button#forNew {
  width: 70px;
  font-size: 18px;
}

button#forLanding{
  width: 200px;
}

button#forSubmit{
  width: 200px;
}

button#forIssue{
  width: 70px;
  /* height: 30px; */
}

textarea{
  font-family: "K2D", sans-serif;
}

input.checkbox{
  display: none;
}

input.checkbox:checked{
  background-color: black;

}

li{
  list-style-type: none;
}

`