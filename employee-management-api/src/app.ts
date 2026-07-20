import express from "express";
const app = express();
app.use(express.json());
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employee.routes';
import departementRoutes from './routes/department.routes';
import attendanceRoutes from './routes/attendance.routes';
import leaveRoutes from './routes/leave.route'


app.use(helmet());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)
app.use(
    compression()
)

app.use(morgan("dev"));

app.use(cookieParser())


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/department', departementRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/leave', leaveRoutes)


app.use(notFound);
app.use(errorHandler);
export default app;