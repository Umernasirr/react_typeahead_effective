import React, { useState, useEffect } from "react";
import "./App.css";
// https://api.github.com/search/users?q=um
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Changes the search query state

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getUsers = async (searchQuery) => {
      const res = await fetch("https://api.github.com/search/users?q=um");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const fetchedUsers = await res.json();
      setUsers(fetchedUsers.items);
    };
    // Make API to Fetch Users from Github
    getUsers();
  }, []);

  return (
    <div className="App">
      <header>Header</header>

      <div className="container">
        <h1 className="container__heading">Train Effective</h1>
        <h3 className="container__subheading"> Github Typeahead</h3>

        <div className="container__form">
          <label htmlFor="name" className="form__label">
            Enter Github Username
          </label>
          <input
            type="input"
            className="form__input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Type Username"
            onClick={() => setShowSuggestions(true)}
          />
        </div>

        <div className="container__suggestions">
          {users.map((user) => (
            <div>{user.login}</div>
          ))}
        </div>
      </div>

      <footer>Footer</footer>
    </div>
  );
}

export default App;
