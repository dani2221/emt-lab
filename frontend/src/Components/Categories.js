import {useEffect, useState} from "react";
import axios from "axios";

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/books/categories`).then(el => {
            console.log(el.data)
            setCategories(el.data)
        })
    },[])
    return(
        <div style={{padding:'20px'}}>
            <ul>
            {categories.map(el=><li>{el}</li>)}
            </ul>

        </div>
    )
}

export default Categories;