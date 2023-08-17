import React, { useEffect, useState } from "react";
import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hook/useUserActions";
import { UserForm } from "../types";
import { useAppSelector } from "../hook/store";
import { User, UserWithId } from "../store/users/slice";

export default function UserForm({ userIdEdit, setUserIdEdit }: UserForm) {
  const USER_EMPTY: User = { name: "", email: "", github: "" };
  const { addUser, editUser } = useUserActions();
  const [result, setResult] = useState<"ok" | "ko" | null>(null);
  const [formData, setFormData] = useState<User>(USER_EMPTY);
  const Users = useAppSelector((state) => state.users);

  useEffect(() => {
    if (userIdEdit) {
      const userFilter = Users.find(
        (user: UserWithId) => user.id === userIdEdit
      );
      console.log(userIdEdit, Users, userFilter);
      setFormData({
        name: userFilter?.name || "",
        email: userFilter?.email || "",
        github: userFilter?.github || "",
      });
    }
  }, [userIdEdit]);

  const handdleChange = (
    element: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = element.target;
    setFormData({
      ...formData,
      ...{ [name]: value },
    });
  };

  const handdleCreate = () => {
    setResult(null);
    const { name, email, github } = formData;
    if (!name || !email || !github) {
      return setResult("ko");
    }
    addUser({ name, email, github });
    setFormData(USER_EMPTY);
    return setResult("ok");
  };

  const handdleEdit = () => {
    setResult(null);
    const { name, email, github } = formData;
    if (!name || !email || !github) {
      return setResult("ko");
    }
    editUser({ name, email, github }, userIdEdit);
    setFormData(USER_EMPTY);
    setUserIdEdit("");
    return setResult("ok");
  };
  return (
    <Card className=" h-fit">
      <Title className="mb-3 text-2xl ">User data</Title>
      <form className="flex flex-col gap-4">
        <TextInput
          name="name"
          value={formData.name}
          onChange={(e) => handdleChange(e)}
          placeholder="Name"
        />
        <TextInput
          name="email"
          onChange={(e) => handdleChange(e)}
          type="email"
          value={formData.email}
          placeholder="Email"
        />
        <TextInput
          name="github"
          onChange={(e) => handdleChange(e)}
          placeholder="Github user"
          value={formData.github}
        />
        <div>
          <Button
            color={!userIdEdit ? "blue" : "purple"}
            className="mt-4 "
            type="button"
            onClick={() => (!userIdEdit ? handdleCreate() : handdleEdit())}
          >
            {userIdEdit ? "Edit" : "Create"}
          </Button>
          {userIdEdit && (
            <Button
              color={"gray"}
              className="mt-4 ml-2 "
              type="button"
              onClick={() => {
                setUserIdEdit(""), setFormData(USER_EMPTY);
              }}
            >
              Cancel
            </Button>
          )}
          <span className="ml-3">
            {result === "ok" && (
              <Badge color="green">Guardado correctamente</Badge>
            )}
            {result === "ko" && <Badge color="red">Error con los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
