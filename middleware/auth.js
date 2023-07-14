import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        // Парсимо куки і вибираємо з них accessToken
        // console.log("req.headers.cookie=", req.headers.cookie);
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
          }, {});
        
        const accessToken = cookies.accessToken;
        
        if(!accessToken) return res.status(400).json({msg: "Authorization error"})
        
        new Promise((resolve, reject) => {
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                            if (err) { reject(err);} else {resolve(decoded);}
                            });
            })
            .then(decoded => {
              // Токен валідний, доступ до decoded даних
            
              req.user = decoded;
            
              
            })
            .then (() => {
                next() 
            })
            .catch(err => {
              res.status(401).json({ message: 'Invalid access token' });
            });
        }
    
    catch (error) {
        return res.status(500).json({msg: error.maggage})
    }
}