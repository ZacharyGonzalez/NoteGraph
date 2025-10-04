type TopBarProps = {
  user: any;
  signOut: () => void;
};

export default function TopBar({user, signOut}: TopBarProps) {
  return (
<div className="top-bar">
        <h1>NoteBreak</h1>
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
  );
}   