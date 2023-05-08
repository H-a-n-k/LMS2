import { Link } from "react-router-dom";
import BG from '../../resources/imgs/book-bg.jpg'
import Side from '../../resources/imgs/book-side.jpg'
import BookDetailDialog from "./dialog-book-detail";
import { useState } from "react";
import useGlobalContext from "../../contexts/GlobalContext";
import { getBookCover } from '../../mock-data'

const BooksGrid = ({ bookList, nCol }) => { 

    const [selectedBook, setSelectedBook] = useState(null);
    const { token, role } = useGlobalContext();

    let style;
    if (nCol) style = { gridTemplateColumns: `repeat(${nCol}, 1fr)`}

    const onSelectBook = (e, x) => { 
        if (token && role === 'EMP') return;
        e.preventDefault();

        setSelectedBook(x);
    }

    return <div className="books-grid" style={style} > 
        {bookList && bookList.map(x => (
            <Link to={`/BLibrary/Book/${x.book_id}`} key={x.book_id} onClick={(event) => onSelectBook(event, x)}>
                <div className="book-card">
                    <div className="img-wrap" style={{'--book-bg': `url(${BG})`, '--book-side': `url(${Side})`}}>
                        <div className="img" alt="" style={{ '--bg': `url(${getBookCover(x.book_id)})`}}/>
                    </div>
                    <div className="title" title={x.book_name}>{x.book_name}</div>
                    <div className="author" title={x.author}>{x.author}</div>
                </div>
            </Link>
        ))}

        {selectedBook && <BookDetailDialog onExit={() => setSelectedBook(null)} book={selectedBook} />}
    </div>
}

export default BooksGrid;