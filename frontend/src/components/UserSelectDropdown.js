import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function UserSelectDropdown({
  users = [],
  selectedUser,
  onSelect,
  onAddUser,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(users || []);
  const rootRef = useRef(null);

  useEffect(() => {
    setFiltered(
      users.filter((u) =>
        u.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [query, users]);

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    const selected = users.find((u) => u._id === selectedUser);
    if (selected) setQuery(selected.name);
  }, [selectedUser, users]);

  const choose = (u) => {
    onSelect && onSelect(u._id);
    setQuery(u.name);
    setOpen(false);
  };

  const handleAdd = () => {
    const name = query.trim();
    if (!name) return;
    const exists = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      choose(exists);
      return;
    }
    onAddUser && onAddUser(name);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="user-select" ref={rootRef}>
      <div className="search-wrap">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          placeholder={users.length ? "Search or add user" : "Add first user"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          aria-label="Search users"
        />
        <button className="add-btn" title="Add user" onClick={handleAdd}>
          <FaPlus />
        </button>
      </div>

      {open && filtered && filtered.length > 0 && (
        <ul className="dropdown-list" role="listbox">
          {filtered.map((u) => (
            <li key={u._id} className="dropdown-item" onClick={() => choose(u)}>
              <span className="dropdown-name">{u.name}</span>
              <span className="dropdown-meta">{u.totalPoints} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
