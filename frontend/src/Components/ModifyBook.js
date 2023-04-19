import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ModifyBook = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState({})
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        const id = searchParams.get("id")
        if(id!=null){
            axios.get(`http://localhost:8080/api/books/${id}`).then(el => {
                console.log(el.data)
                setData(el.data)
            })
        }
        axios.get(`http://localhost:8080/api/books/categories`).then(el => {
            setCategories(el.data)
        })
        axios.get(`http://localhost:8080/api/authors`).then(el => {
            setAuthors(el.data)
        })
    },[])

    const submit = () =>{
        console.log(data)
        const id = searchParams.get("id")
        if(id!=null) {
            axios.put(`http://localhost:8080/api/books/edit/${id}`, {...data, authorId: parseInt(data.author.split(":")[0])}).then(el=>{
                navigate("/")
            })
        }
        else{
            axios.post(`http://localhost:8080/api/books/add`, {...data, authorId: parseInt(data.author.split(":")[0])}).then(el=>{
                navigate("/")
            })
        }
    }
    return(
        <div style={{margin:'20px'}}>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input className="form-control" id="exampleFormControlInput1" value={data.name} onChange={(el)=>setData(dt=>{return({...dt, name: el.target.value})})}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Category</label>
                <select className="form-control" id="exampleFormControlSelect1" value={data.category}  onChange={(el)=>setData(dt=>{return({...dt, category: el.target.value})})}>
                    {categories.map(el => <option>{el}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Author</label>
                <select className="form-control" id="exampleFormControlSelect2" value={data.author}  onChange={(el)=>setData(dt=>{return({...dt, author: el.target.value})})}>
                    {authors.map(el => <option>{el.id +": "+el.name + " " + el.surname}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Copies</label>
                <input className="form-control" id="exampleFormControlInput2" type={'number'} value={data.availableCopies} onChange={(el)=>setData(dt=>{return({...dt, availableCopies: el.target.value})})}/>
            </div>
            <br/>
            <button className={'btn btn-primary'} onClick={submit}>Submit</button>
        </div>
    )
}

export default ModifyBook;