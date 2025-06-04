import './styles.css'

function Sidebar({friends, onCheckboxToggle, friendsToDisplay}) {
  return (
    <>
      <div className="friend-display">
        <header className="friend-header">
          Friends
        </header>
        <div className="friend-body">
          <div className = "friend-list">
          {friends
              .map((friend, idx) => (
              <div key={idx} className="friend-card">
                <input 
                  type="checkbox"
                  className = "friend-checkbox"
                  checked = {friendsToDisplay.includes(friend.id)}
                  onChange={() => onCheckboxToggle(friend.id)}
                />
                <strong>{friend.name}</strong>
              </div>
            ))}
            </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
