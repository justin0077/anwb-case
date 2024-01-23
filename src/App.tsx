import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./layouts/Header";

// Routes
import Home from "./pages/Home";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
