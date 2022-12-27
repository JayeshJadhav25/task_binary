const express = require('express');
const userRoutes = require('./routes/user.routes');
require('./db/mongo');
const { logger } = require('./utils');
const morgan = require('./utils/morgan')

const app = express();
app.use(express.json());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

const PORT = process.env.PORT || 3000;

app.use('/user',userRoutes);

app.get('/',(req,res) => {
    res.json('Hello World');
})

app.use((err,req,res,next) => {
    return res.json({
        error:{
            message:"Server Error",
            error:err
        }
    })
})

app.listen(PORT,() => {
    logger.info(`server is running at ${PORT}....`);
})