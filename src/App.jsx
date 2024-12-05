import { lazy, Suspense } from "react";
import {
  createBrowserRouter as BrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/AppLayout"));

const router = BrowserRouter(
  [
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/product",
      element: <Product />
    },
    {
      path: "/pricing",
      element: <Pricing />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate replace to="cities" />
        },
        {
          path: "cities",
          element: <CityList />
        },
        {
          path: "cities/:id",
          element: <City />
        },
        {
          path: "countries",
          element: <CountryList />
        },
        {
          path: "form",
          element: <Form />
        }
      ]
    },
    {
      path: "*",
      element: <PageNotFound />
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_startTransitions: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* suspense - lazy loading */}
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
          {/* <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes> */}
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
