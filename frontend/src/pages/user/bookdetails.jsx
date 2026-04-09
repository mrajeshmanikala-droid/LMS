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
                        src={(() => { const img = book.coverImage; if (!img) return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23e9ecef' width='400' height='300'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23adb5bd'%3E📚%3C/text%3E%3Ctext x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23adb5bd'%3ENo Cover Available%3C/text%3E%3C/svg%3E"; if (img.startsWith('http')) return img; return `${Server_URL}${img.replace(/^\//, '')}`; })()}
                        alt={book.title}
                        className="book-image"
                        onError={(e) => {
                            if (!e.target.dataset.fallback) {
                                e.target.dataset.fallback = "true";
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23e9ecef' width='400' height='300'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' fill='%23adb5bd'%3E📚%3C/text%3E%3Ctext x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23adb5bd'%3ENo Cover Available%3C/text%3E%3C/svg%3E";
                            }
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