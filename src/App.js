import "./App.css";
import BookList from "./components/BookList/BookList";
import { PageHeader } from "./components/PageHeader/PageHeader";

function App() {
  return (
    <>
      <div className="bg-body-tertiary">
        <PageHeader />
        <BookList />
      </div>
    </>
  );
}

export default App;
