import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import MyNotes from "./Pages/MyNotes/MyNotes";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import NotFound from "./Components/Error/NotFound";
import Test from "./Pages/test/Test";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <MyNotes /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "test", element: <Test /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);


  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
