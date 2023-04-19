import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import '../App.css'
import {useNavigate} from "react-router-dom";

const Books = ({}) => {
    const PAGESIZE = 5;
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const navigate = useNavigate();

    const handlePageClick = (event) => {
        getBooks(event.selected);
    };
    
    useEffect(()=>{
        getBooks(0)
    },[])

    const getBooks = (page) => {
        setLoading(true)
        axios.get(`http://localhost:8080/api/books?page=${page}&size=${PAGESIZE}`).then(el=>{
            setBooks(el.data.content)
            setTotalPages(el.data.totalPages)
            setLoading(false)
        })
    }

    const lendBook = (bookId) => {
        axios.put(`http://localhost:8080/api/books/borrow/${bookId}`).then(el=>{
            setBooks(books => {
                const bks = []
                for(const book of books) {
                    if (book.id == bookId) {
                        bks.push({...book, availableCopies: book.availableCopies - 1})
                    }else{
                        bks.push(book)
                    }
                }
                return bks;
            })
        })
    }

    const deleteBook = (bookId) => {
        axios.delete(`http://localhost:8080/api/books/delete/${bookId}`).then(el=>{
            getBooks(0)
        })
    }

    return(
        <div style={{margin:'10px'}}>
            {loading ? <>Loading ...</> : 
            <>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Copies</th>
                        <th scope="col">Author</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(el=>(

                    <tr key={el.id} style={{verticalAlign:'middle'}}>
                        <th scope="row">{el.name}</th>
                        <td>{el.category}</td>
                        <td>{el.availableCopies}</td>
                        <td>{el.author.name + " "+ el.author.surname}</td>
                        <td><div>
                            <span style={{textDecoration:'underline', cursor: 'pointer'}} onClick={()=>lendBook(el.id)}>Mark as taken</span>
                            <br/>
                            <span style={{textDecoration:'underline', cursor: 'pointer'}} onClick={()=>navigate("/modify?id="+el.id)}>Edit</span>
                            <br/>
                            <span style={{textDecoration:'underline', cursor: 'pointer', color:'red'}} onClick={()=>deleteBook(el.id)}>Delete</span>
                        </div></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </>
            }
            <div>
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default Books;