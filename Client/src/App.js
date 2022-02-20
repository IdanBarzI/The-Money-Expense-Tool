import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, LoadingSpinner } from "./UIKit";

const User = React.lazy(() => import("./pages/User"));
const NewExpense = React.lazy(() => import("./pages/NewExpense"));
const Expenses = React.lazy(() => import("./pages/Expenses"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="/home" element={<Expenses />} />
          <Route path="/settings" element={<User />} />
          <Route path="/add-expense" element={<NewExpense />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
