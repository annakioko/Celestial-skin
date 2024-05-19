import { useState, useEffect } from "react";

export const AdminCustomer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    console.log("Using token:", token);

    fetch("http://127.0.0.1:5500/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);

        if (data && data.users) {
          const filteredUsers = data.users.filter(
            (user) => user.role === "user"
          );
          setUsers(filteredUsers);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-light-mode min-h-screen p-4">
      <h1 className="text-Heading font-bold text-2xl text-center py-3">
        CUSTOMERS
      </h1>
      <div className="md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-variant1-dark p-2 shadow-md text-center"
          >
            <div className="text-[18px] font-body bg-white dark:bg-variant1-dark text-secondary p-2 capitalize">
              {user.name}
            </div>
            <div className="text-[14px] font-body bg-white dark:bg-variant1-dark text-Heading dark:text-primary-light p-2 capitalize">
              {user.email}
            </div>
            <div className="text-[14px] font-body bg-white dark:bg-variant1-dark text-Heading dark:text-primary-light p-2">
              {user.address}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <table className="w-full mx-auto text-left text-Heading">
          <thead className="text-[18px] font-body bg-secondary text-black">
            <tr className="border-[6px] border-dark-mode bg-dark-mode">
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Email</th>
              <th className="p-[10px]">Address</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-Heading">
            {users.map((user) => (
              <tr
                key={user.id}
                className=" border-[6px]"
              >
                <td className="p-[10px] capitalize">{user.name}</td>
                <td className="p-[10px] capitalize">{user.email}</td>
                <td className="p-[10px]">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
