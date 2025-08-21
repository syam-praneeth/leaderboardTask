import React, { useState } from "react";

export default function UserSelectDropdown({
  users,
  selectedUser,
  onSelect,
  onAddUser,
}) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddUser(name.trim());
    setName("");
  };

  return (
    <div className="user-select">
      <select
        value={selectedUser || ""}
        onChange={(e) => onSelect(e.target.value)}
      >
        {users.map((u) => (
          <option value={u._id} key={u._id}>
            {u.name} ({u.totalPoints})
          </option>
        ))}
      </select>
      <div className="add-user">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New user name"
        />
        <button onClick={handleAdd}>Add User</button>
      </div>
    </div>
  );
}
