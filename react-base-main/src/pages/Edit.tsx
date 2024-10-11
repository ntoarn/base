import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { instance } from '../apis'
const productSchema = z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
})
const Edit = ({ onEdit }) => {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(productSchema),
    })
    useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/products/${id}`)
            reset(data)
        })()
    },[])
  return (
    <>
    <h1>Edit</h1>
    <form onSubmit={handleSubmit((data) => onEdit({...data, id}))}>
        <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" {...register('title', { required: true })} />
            {errors.title && <span className="text-danger">This field is required</span>}
        </div>
        <div className="form-group">
            <label>Price</label>
            <input type="number" className="form-control" {...register('price', {valueAsNumber: true})} />
            {errors.price && <span className="text-danger">This field is required</span>}
        </div>
        <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" {...register('description', { required: true })} />
            {errors.description && <span className="text-danger">This field is required</span>}
        </div>
        <button type="submit" className="btn btn-primary">Edit</button>
    </form>
    </>
  )
}

export default Edit
