import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark Svensson",
    image: "https://i.pravatar.cc/48?u=118836",
    bil: "Volvo,",
    stad: "Valbo",
  },
  {
    id: 933372,
    name: "Sara Nilsson",
    image: "https://i.pravatar.cc/48?u=933372",
    bil: "BMW,",
    stad: "Bybo",
  },
  {
    id: 499476,
    name: "Anthony Hpokins",
    image: "https://i.pravatar.cc/48?u=499476",
    bil: "Saab",
    stad: "Voltstad",
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showInfoFriend, setShowInfoFriend] = useState(false);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleDeleteFriend(id) {
    setFriends((friends) => friends.filter((friends) => friends.id !== id));
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowInfoFriend((showInfo) => !showInfo);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          onDeleteFriend={handleDeleteFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {showInfoFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            key={selectedFriend.id}
            onSelection={handleSelection}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Lägg till"}
        </Button>
      </div>
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend, onDeleteFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
          onDeleteFriend={onDeleteFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend, onDeleteFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>{friend.id}</p>
      <Button onClick={() => onSelection(friend)}>INFO</Button>
      <Button onClick={() => onDeleteFriend(friend.id)}>Ta bort ❌</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [bil, setBil] = useState("");
  const [stad, setStad] = useState("defultStad");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      bil,
      stad,
      image: `${image}?=${id}`,
    };

    onAddFriend(newFriend);

    setName("");
    setBil("");
    setStad("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Namn</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Bil</label>
      <input type="text" value={bil} onChange={(e) => setBil(e.target.value)} />

      <label>Bild</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label>Stad</label>
      <select value={stad} onChange={(e) => setStad(e.target.value)}>
        <option value="defultStad">Välj stad</option>
        <option value="valbo">Valbo</option>
        <option value="ljusne">Ljusne</option>
        <option value="krylbo">Krylbo</option>
        <option value="lingbo">Lingbo</option>
      </select>

      <Button>Lägg till</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSelection }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSelection((show) => !show);
    console.log("hgfdsa");
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Namn {selectedFriend.name}</h2>
      <h3>Bil: {selectedFriend.bil}</h3>
      <h3>Stad: {selectedFriend.stad}</h3>
      <p>{selectedFriend.id}</p>

      <Button>Stäng</Button>
    </form>
  );
}
