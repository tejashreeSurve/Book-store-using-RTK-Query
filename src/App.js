import logo from "./logo.svg";
import "./App.css";
import BookList from "./components/BookList/BookList";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { Pagination } from "./components/Pagination/Pagination";

function App() {
  return (
    <>
      <div className="py-2 bg-body-tertiary">
        <PageHeader />
        <BookList />
        {/* <Pagination /> */}
      </div>
    </>
  );
}

export default App;
