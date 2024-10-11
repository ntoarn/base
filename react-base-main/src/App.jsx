import "./App.scss";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import List from "./pages/List";
import { useEffect, useState } from "react";
import { instance } from "./apis";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
	const nav = useNavigate()
	const [product, setProduct] = useState([])
	useEffect(() => {
		(async () => {
			const { data } = await instance.get('/products')
			setProduct(data)
		})()
	},[])
	const handleRemote = async (id) => {
		if(window.confirm('Are you sure?')){
			await instance.delete(`/products/${id}`)
			setProduct(product.filter((item) => item.id !== id))
		}
	}
	const handleAdd = async (productData) => {
		const { data } = await instance.post('/products', productData)
		const newData = await instance.get('/products')
		setProduct(newData.data)
		nav('/')
	}
	const handleEdit = async ( data ) => {
		 await instance.put(`/products/${data.id}`, data)
		 const newData = await instance.get('/products')
		 setProduct(newData.data)
		nav('/')
	}
	return (
		<>
			<header>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/add">add</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/login">login</Link>
					</li>
				</ul>
				<ul>
					<li>
						<Link to="/register">register</Link>
					</li>
				</ul>
			</header>
			<Routes>
				<Route index element={<List data={product} onDel={handleRemote}/>}/>
				<Route path="/add" element={<Add onAdd={handleAdd}/>}/>
				<Route path="/edit/:id" element={<Edit onEdit={handleEdit}/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
			</>
	);
}

export default App;
