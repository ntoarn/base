import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const productSchema = z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
})
const Add = ({ onAdd }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    })
  return (
    <>
    <h1>Add</h1>
    <form onSubmit={handleSubmit((data) => onAdd(data))}>
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
        <button type="submit" className="btn btn-primary">Add</button>
    </form>
    </>
  )
}

export default Add
