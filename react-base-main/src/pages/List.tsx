import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ data, onDel }) => {
  return (
    <table className="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>STT</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>ACtion</th>
            </tr>
        </thead>
        <tbody>
            {data?.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                        <Link to={`/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                        <button onClick={() => onDel(item.id)}  className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default List
