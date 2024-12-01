import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Header from "./components/Header";
import api from "./utils/api";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      loader: async () => {
        try {
          const { data } = await api.get(`/all`);

          return data;
        } catch (error) {
          return [];
        }
      },
    },
    {
      path: "/:id",
      element: <CountryDetail />,
      loader: async ({ params }) => {
        const { data } = await api.get(`/alpha/${params.id}`);

        return data[0];
      },
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <div className=" min-h-svh bg-ligth-background dark:bg-dark-background flex flex-col">
      <Header />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
