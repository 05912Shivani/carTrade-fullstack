module.exports = (req, res, next) => {
  // Export a middleware function that checks if the user is logged in
  if (!req.session || !req.session.userId) {
       // If there is no session object OR no userId stored in session,
    // it means the user is not authenticated
    return res.status(401).json({ message: 'Unauthorized: Please log in' });
    // Send 401 Unauthorized response and stop further execution
  }
  next();
   // If the user is authenticated, proceed to the next middleware or route handler
};

