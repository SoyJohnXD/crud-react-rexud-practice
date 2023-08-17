import { useState } from "react";
import "./App.css";
import ListOfUsers from "./components/ListOfUsers.1";
import UserForm from "./components/UserForm";
import { EditUser } from "./types";

function App() {
  const [userIdEdit, setUserIdEdit] = useState<string>("");
  return (
    <main className="flex flex-row items-center justify-center h-screen w-screen gap-10">
      <section className="w-[60%]">
        <ListOfUsers setUserIdEdit={setUserIdEdit} />
      </section>
      <section className="w-[30%]">
        <UserForm userIdEdit={userIdEdit} setUserIdEdit={setUserIdEdit} />
      </section>
    </main>
  );
}

export default App;
