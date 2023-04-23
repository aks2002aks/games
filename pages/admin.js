import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function admin() {
  const router = useRouter();
  const [Users, setUsers] = useState([]);
  const checkadmin = async () => {
    const token = localStorage.getItem("token");

    let res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    let response = await res.json();
    if (!response.admin) {
      router.push("/");
    }
  };

  const getusers = async () => {
    let res = await fetch("/api/getAllUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await res.json();
    setUsers(response.allUsers);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    checkadmin();
    getusers();
  }, []);

  return (
    <>
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center text-white ">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded text-xl"
        >
          GO BACK
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Index
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level 1 Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level 2 Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Level 3 Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.Level}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.Level1Time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.Level2Time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.Level3Time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.Level1Time + user.Level2Time + user.Level3Time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default admin;
