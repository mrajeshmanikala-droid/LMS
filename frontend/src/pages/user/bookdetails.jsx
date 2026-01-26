import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { motion } from "framer-motion";
import { FaBookOpen, FaUserEdit, FaTags, FaBarcode, FaRupeeSign, FaInfoCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiBookmarkLine } from "react-icons/ri";
import "./bookdetails.css"
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";


function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isIssuing, setIsIssuing] = useState(false);
    const [issuedBooks, setIssuedBooks] = useState([]);

    // async function issueBook(bookid) {
    //     try {
    //         setIsIssuing(true);
    //         const authToken = localStorage.getItem("authToken");
    //         if (!authToken) {
    //             alert("Please login to issue a book.");
    //             return;
    //         }
    //         const url = Server_URL + 'books/issuebook/' + bookid;
    //         const response = await axios.post(url, {}, {
    //             headers: {
    //                 Authorization: `Bearer ${authToken}`,
    //             },
    //         });
    //         const { error, message } = response.data;
    //         if (error) {
    //             alert(message);
    //         } else {
    //             alert(message);
    //             // Refresh book data after issuing
    //             const updatedResponse = await axios.get(`${Server_URL}books/${id}`);
    //             setBook(updatedResponse.data);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error.response?.data || error.message);
    //         alert(error.response?.data?.message || "Something went wrong! Please try again.");
    //     } finally {
    //         setIsIssuing(false);
    //     }
    // }
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
           const response = await axios.post(`${Server_URL}api/books/borrow/request-issue/${bookid}`,{}, {
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

    useEffect(() => {
        async function fetchBook() {
            try {
                setIsLoading(true);
                const response = await axios.get(`${Server_URL}api/books/${id}`);
                setBook(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching book:", error);
                setError("Failed to load book details. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchBook();
    }, [id]);

    useEffect(() => {
        async function fetchIssuedBooks() {
            try {
                const authToken = localStorage.getItem("authToken");
                if (authToken) {
                    const response = await axios.get(`${Server_URL}api/books/issued`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    setIssuedBooks(response.data.issuedBooks || []);
                }
            } catch (error) {
                console.error("Error fetching issued books:", error);
            }
        }
        fetchIssuedBooks();
    }, []);

    if (isLoading) return (
        <div className="loading-container">
            <motion.div 
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <p>Loading book details...</p>
        </div>
    );

    if (error) return (
        <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {error}
        </motion.div>
    );

    if (!book) return (
        <div className="not-found-container">
            <RiBookmarkLine className="not-found-icon" />
            <h2>Book Not Found</h2>
            <p>The book you're looking for doesn't exist or may have been removed.</p>
        </div>
    );

    return (
        <motion.div 
            className="book-details-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="book-details">
                <motion.div 
                    className="book-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <img
                        src={book.coverImage ? `${Server_URL}${book.coverImage.replace(/^\//, '')}` : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYm9va0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N0VlYTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY0YmEyO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI2Jvb2tHcmFkaWVudCkiIHJ4PSI4IiByeT0iOCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjI3MCIgaGVpZ2h0PSI0MjAiIGZpbGw9IiNmZmZmZmYiIHJ4PSI0IiByeT0iNCIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzJjM2U1MCI+Qm9vayBUaXRsZTwvdGV4dD4KICA8dGV4dCB4PSIxNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjN2Y4YzhkIj5ieSBBdXRob3IgTmFtZTwvdGV4dD4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjQwIiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjEiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjI1IiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjE1IiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjMiLz4KICA8cmVjdCB4PSI2MCIgeT0iMzMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZWNmMGYxIiByeD0iMTUiIHJ5PSIxNSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMzQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMzNDQ5NWUiPkZJQ1RJT048L3RleHQ+CiAgPHRleHQgeD0iMTUwIiB5PSI0MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5NWE1YTYiPklTQk46IDk3OC0wLTEyMzQ1Ni03OC05PC90ZXh0PgogIDxyZWN0IHg9IjEwMCIgeT0iNDEwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjhmOWZhIiByeD0iNCIgcnk9IjQiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjQzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjN2Y4YzhkIj5Cb29rTmVzdDwvdGV4dD4KPC9zdmc+"}
                        alt={book.title}
                        className="book-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYm9va0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N0VlYTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY0YmEyO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI2Jvb2tHcmFkaWVudCkiIHJ4PSI4IiByeT0iOCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjI3MCIgaGVpZ2h0PSI0MjAiIGZpbGw9IiNmZmZmZmYiIHJ4PSI0IiByeT0iNCIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzJjM2U1MCI+Qm9vayBUaXRsZTwvdGV4dD4KICA8dGV4dCB4PSIxNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjN2Y4YzhkIj5ieSBBdXRob3IgTmFtZTwvdGV4dD4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjQwIiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjEiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjI1IiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjIiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjE1IiBmaWxsPSIjMzQ5OGRiIiBvcGFjaXR5PSIwLjMiLz4KICA8cmVjdCB4PSI2MCIgeT0iMzMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZWNmMGYxIiByeD0iMTUiIHJ5PSIxNSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMzQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMzNDQ5NWUiPkZJQ1RJT048L3RleHQ+CiAgPHRleHQgeD0iMTUwIiB5PSI0MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5NWE1YTYiPklTQk46IDk3OC0wLTEyMzQ1Ni03OC05PC90ZXh0PgogIDxyZWN0IHg9IjEwMCIgeT0iNDEwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjhmOWZhIiByeD0iNCIgcnk9IjQiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjQzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjN2Y4YzhkIj5Cb29rTmVzdDwvdGV4dD4KPC9zdmc+";
                        }}
                    />
                    {book.availableCopies !== undefined && (
                        <div className={`availability-badge ${book.availableCopies > 0 ? 'available' : 'unavailable'}`}>
                            {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Out of Stock'}
                        </div>
                    )}
                </motion.div>
                
                <div className="book-info">
                    <div className="book-header">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="book-author">by {book.author}</p>
                      
                    </div>
                    
                    <div className="book-meta">
                        <div className="meta-item">
                            <FaTags className="meta-icon" />
                            <div>
                                <span className="meta-label">Category</span>
                                <span className="meta-value">{book.category}</span>
                            </div>
                        </div>
                        <div className="meta-item">
                            <FaBarcode className="meta-icon" />
                            <div>
                                <span className="meta-label">ISBN</span>
                                <span className="meta-value">{book.isbn}</span>
                            </div>
                        </div>
                        <div className="meta-item">
                            <FaRupeeSign className="meta-icon" />
                            <div>
                                <span className="meta-label">Price</span>
                                <span className="meta-value">₹{book.price}</span>
                            </div>
                        </div>

                    </div>
                    
                    <div className="book-description">
                        <h3>
                            <FaInfoCircle className="description-icon" />
                            Description
                        </h3>
                        <p>{book.description || "No description available for this book."}</p>
                    </div>
                    
                    <div className="action-buttons">
                        {(() => {
                            const isAlreadyRequested = issuedBooks.some(issuedBook => issuedBook.bookId._id === book._id);
                            const hasMaxBooks = issuedBooks.length >= 4;
                            const isOutOfStock = book.availableCopies !== undefined && book.availableCopies <= 0;
                            const isDisabled = isAlreadyRequested || hasMaxBooks || isOutOfStock;

                            let buttonText = "Request to Issue";
                            if (isOutOfStock) buttonText = "Out of Stock";
                            else if (isAlreadyRequested) buttonText = "Already Requested";
                            else if (hasMaxBooks) buttonText = "Max Books Reached";

                            return (
                                <motion.button
                                    className={`issue-button ${isDisabled ? 'disabled' : ''}`}
                                    onClick={() => issueBook(book._id)}
                                    whileHover={isDisabled ? {} : { scale: 1.05 }}
                                    whileTap={isDisabled ? {} : { scale: 0.95 }}
                                    disabled={isDisabled}
                                >
                                    {isIssuing ? (
                                        <span className="button-loader"></span>
                                    ) : (
                                        <>
                                            <FaBookOpen className="button-icon" />
                                            {buttonText}
                                        </>
                                    )}
                                </motion.button>
                            );
                        })()}
                    </div>
                </div>
            </div>
            
          
           
        </motion.div>
    );
}

export default BookDetails;