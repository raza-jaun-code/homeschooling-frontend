import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const AdminManageUsers = () => {
  const cap = (name) =>
    name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : "";

  const url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  const [parents, setParents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all parents from backend
  useEffect(() => {
    const fetchParents = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${url}api/v1/admin`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError("Failed to fetch users.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setParents(data);
        setFiltered(data);
      } catch {
        setError("Server error.");
      }

      setLoading(false);
    };

    fetchParents();
  }, []);

  // Filter search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(parents);
    } else {
      setFiltered(
        parents.filter((p) =>
          `${p.firstName} ${p.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [search, parents]);

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-xl min-h-[70vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-400">
          Manage Users
        </h2>

      </div>

      <p className="text-gray-400 mb-6">
        Interface to view and manage registered parent accounts.
      </p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 bg-[#1c2438] border border-gray-700 rounded-lg text-gray-200 focus:ring-pink-500 focus:border-pink-500 w-full sm:max-w-md transition duration-150"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-300 py-4">Loading users...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-400 py-3 font-semibold">{error}</p>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-[#1c2438] rounded-xl">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#140d1c]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#1c2438]/50 transition duration-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cap(p.firstName)} {cap(p.lastName)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-indigo-800 text-indigo-200">
                        Parent
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-800 text-green-200">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManageUsers;