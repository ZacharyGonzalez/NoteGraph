type TopBarProps = {
    user: any;
    signOut: () => void;

}
export default function TopBar({ user, signOut }: TopBarProps) {
    return (
        <div className="top-bar">
            {user?.signInDetails?.loginId}'s workspace
            <button onClick={signOut}>Sign out</button>
        </div>
    );
}