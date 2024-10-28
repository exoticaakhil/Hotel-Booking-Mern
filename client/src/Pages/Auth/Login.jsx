import React, { useContext, useState } from 'react'
import { toast } from "react-toastify"
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [user,setUser] = useState({
    email: "",
    password: ""
  })

  const context = useContext(AuthContext)
  let navigate = useNavigate()

  const readInput = (e) => {
    const {name,value} = e.target
    setUser({...user, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log(`login =`, user)
      await axios.post(`/api/auth/login` , user)
      .then(res => {
      toast.success(res.data.msg)
      context.setIsLogin(true)
      context.setToken(res.data.token)
      navigate(`/`)
      }).catch(err => toast.error(err.response.data.msg))
    }catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-group mt-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" value={user.email} onChange={readInput} id="email" className="form-control" />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={user.password} onChange={readInput} id="password" className="form-control" />
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Login" className="btn btn-success" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
