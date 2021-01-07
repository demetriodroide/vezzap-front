import React,{useState} from "react";
import { BrowserRouter as Redirect} from "react-router-dom";
import { useForm } from "react-hook-form";
import "./RegisterPage.css"
import registerbtn from '../../img/register.png';



function RegisterPage() {
      
      let [redirected,setRedirected] = useState(false)
    
      const { register, handleSubmit } = useForm();
      const onSubmit = d => {
        let  data = d.trim("> ")
        fetch("http://localhost:7777/register", {
			method: 'post',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
      if ( response.redirected) {
        setRedirected("/dasboard")
        }
		})
      };
    

  return (
    <div className="screen-size screen-back">
        {redirected && <Redirect to={redirected}/> }
        <p>Registrate en Vezapp</p>
            <form action="" id='form-reg-1' onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="borde">
                 
                  <input type="text" name="user" id="user" placeholder="nombre" ref={register} className="inputform"/>
                  <input type="text" name="mail" id="mail" placeholder="example@gmail.com" ref={register} className="inputform"/>
                  <input type="password" name="pwd" id="pwd" placeholder="password" ref={register} className="inputform"/>
                  <input type="password" name="pwdR" id="pwdR" placeholder="repite password" ref={register} className="inputform"/>
                      <div className="distance">
                  <button  className='btn-157'><img src={registerbtn} alt="a" className="frameimg"/></button>
                      </div>

              </fieldset>
            </form>
      
    </div>
  );
}

export default RegisterPage;