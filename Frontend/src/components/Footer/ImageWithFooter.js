import React from "react";
import '../../app/ImageWithFooter.css'; // Ensure you have your CSS styles here

const ImageWithFooter = () => {
  return (
    <div >
      <span><img src={require(`./bond.jpg`)}alt="user" /></span>
      <footer className="footer">
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
        <p>Follow us on:</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default ImageWithFooter;
