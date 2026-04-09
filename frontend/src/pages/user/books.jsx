import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./books.css"
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";

// Safe inline SVG fallback — never triggers a network request, so no error loop
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23e9ecef' width='400' height='300'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23adb5bd'%3E📚%3C/text%3E%3Ctext x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23adb5bd'%3ENo Cover Available%3C/text%3E%3C/svg%3E";

// Resolve image URL — handles both full URLs (https://...) and local paths (/uploads/...)
const getImageUrl = (coverImage) => {
  if (!coverImage) return FALLBACK_IMAGE;
  if (coverImage.startsWith('http')) return coverImage;
  return `${Server_URL}${coverImage.replace(/^\//, '')}`;
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);


  const navigate = useNavigate();


  async function issueBook(bookid) {
        try {
          console.log("bookId");
            console.log(bookid);
          const authToken = localStorage.getItem("authToken");
          console.log(authToken)
          if (!authToken) {
            showErrorToast("Please login to issue a book.");
            return;
        }
           const url =Server_URL + 'borrow/request-issue/'+bookid;
           const response = await axios.post(`${Server_URL}api/books/borrow/request-issue/${bookid}`, {}, {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

          // alert(response.data);
          const {error,message} = response.data;
          if(error){
            console.log(error);
            showErrorToast(message)
          }
          else{
            showSuccessToast(message);
          }
        } catch (error) {
          // console.error("Error:", error.response?.data || error.message);
          showErrorToast(error.response?.data?.message || "Something went wrong! Please try again.");
          
        }    
      }
    
      async function bookDetails(bookid) {
        console.log(bookid)
        navigate(`/bookdetails/${bookid}`);       
      }

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${Server_URL}api/books`)
      .then((response) => {
        if (!response.data.error) {
          setBooks(response.data.books);
          setFilteredBooks(response.data.books);
          const uniqueCategories = ["All", ...new Set(response.data.books.map(book => book.category))];
          setCategories(uniqueCategories);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterBooks(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterBooks(searchTerm, category);
  };

  const filterBooks = useCallback((search, category) => {
    let filtered = books;
    
    if (category !== "All") {
      filtered = filtered.filter(book => book.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    }
    
    setFilteredBooks(filtered);
  }, [books]);

  // Handle image error — only swap once to avoid infinite loop
  const handleImageError = useCallback((e) => {
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = "true";
      e.target.src = FALLBACK_IMAGE;
    }
  }, []);

  // Handle image load — add loaded class for fade-in
  const handleImageLoad = useCallback((e) => {
    e.target.classList.add("loaded");
  }, []);


  return (
    <div className="container-fluid books-container">
      <div className="row">
      
        <div className="col-md-3 p-4 sidebar">
          <h4 className="text-center mb-4">📚 Categories</h4>
          <div className="category-scroll">
            {categories.map((category, index) => (
              <div
                key={category}
                className={`category-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-9 main-content">
          <div className="search-header p-3">
            <h2 className="page-title">All Books</h2>
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="bi bi-search search-icon"></i>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <div key={book._id} className="book-card">
                  <div className="card-image-container">
                    <img
                      src={getImageUrl(book.coverImage)}
                      className="card-image"
                      alt={book.title}
                      loading="lazy"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    <div className="book-badge">{book.category}</div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-author">By {book.author}</p>
                    <div className="card-footer">
                      <span className="card-price">₹{book.price}</span>
                      <div className="card-actions">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => bookDetails(book._id)}
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => issueBook(book._id)}
                        >
                          Issue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-books-found">
              <i className="bi bi-book-slash"></i>
              <h4>No books found!</h4>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;