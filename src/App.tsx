import React from "react";
import "./App.css";
import PeopleList from "./components/PeopleList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <PeopleList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
