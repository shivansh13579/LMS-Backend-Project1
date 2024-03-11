
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routers.js';
import errorMiddleware from '../server1/middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping',function(req,res){
    res.send('/pong');
});

 //routes of 3 modules

 app.use('/api/v1/user',userRoutes);
 app.use('/api/v1/courses',courseRoutes);

 app.all('*', (req,res) => {
    res.status(404).send('OOPS!! 404 page not found');
 });

 app.use(errorMiddleware);

//  module.exports = app;
export default app;
