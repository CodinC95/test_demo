// authorizationHandle.js

// This middleware function checks if the user is authorized to access a route
function authorizationHandle(req, res, next) {

    if (req.isAuthenticated()) {

        next();
        
    } else {
        // User is not authenticated, send a 401 Unauthorized status
        res.status(401).json({ error: 'Unauthorized' });
    }
}


module.exports = authorizationHandle;