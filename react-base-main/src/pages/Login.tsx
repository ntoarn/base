import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { instance } from '../apis'
import { useNavigate } from 'react-router-dom'
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
const Login = () => {
    const nav = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
    })
    const onSubmit = async (data) => {
        const  res  = await instance.post('/login', data)
        localStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("accessToken", res.data.accessToken)
        nav('/')
    }
  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" {...register('email', { required: true })} />
            {errors.email && <span className="text-danger">This field is required</span>}
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" {...register('password', { required: true })} />
            {errors.password && <span className="text-danger">This field is required</span>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
    </form>
    </>
  )
}

export default Login
