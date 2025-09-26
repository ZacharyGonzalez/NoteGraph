type TopBarProps ={
    user: any;
    signOut : ()=> void;

}
export default function TopBar({user,signOut}: TopBarProps){
    return(
        <div className="top-bar">
            <h1>
            {user?.signInDetails?.loginId}'s todos
            <button onClick={signOut}>Sign out</button>
            </h1>
        </div>
    );
    }