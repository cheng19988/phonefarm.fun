import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1 className="section-title">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-900">
                <td className="py-2 text-white">{u.email}</td>
                <td className="py-2 text-slate-400">{u.name ?? "—"}</td>
                <td className="py-2">
                  <form action={`/api/admin/users/${u.id}`} method="POST" className="inline">
                    <select name="role" defaultValue={u.role} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs">
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                    <button type="submit" className="btn-outline text-xs py-1 px-2 ml-2">Save</button>
                  </form>
                </td>
                <td className="py-2 text-slate-500">{u.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
