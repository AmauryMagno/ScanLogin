import { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';

export const AppRoutes = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}
