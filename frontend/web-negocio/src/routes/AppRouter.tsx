import { Routes, Route } from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
    </Routes>
  );
};
