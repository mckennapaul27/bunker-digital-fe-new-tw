"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { serverUrl } from "@/config";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { CircleLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserRow = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "client" | "admin";
  stripeProductsDefault?: string[];
};

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasInitiallyLoaded = useRef(false);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchUsers = async () => {
      // Only show loading on initial load
      if (!hasInitiallyLoaded.current) {
        setLoading(true);
      }
      setError(null);
      try {
        const res = await fetch(`${serverUrl}/api/api-users/admin/all`, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users.");
        }
        setUsers(data);
        hasInitiallyLoaded.current = true;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // Use accessToken as dependency instead of entire session object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  const handleDelete = async (userId: string, userEmail: string) => {
    if (!session?.accessToken) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${userEmail}? This cannot be undone.`
    );
    if (!confirmed) return;
    try {
      const res = await fetch(
        `${serverUrl}/api/api-users/admin/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete user.");
      }
      toast.success("User deleted successfully");
      // remove from state
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        header: "Name",
        accessorFn: (row) =>
          `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim() || "N/A",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ getValue }) => {
          const role = getValue() as string;
          return <span className="capitalize">{role}</span>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const userId = row.original._id;
          const userEmail = row.original.email;

          return (
            <div className="flex items-center gap-2">
              <Link href={`/admin/${userId}`}>
                <Button variant="ghost" size="icon" aria-label="View profile">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(userId, userEmail)}
                aria-label="Delete user"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [session?.accessToken]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!session) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-500">
              Please log in to view users.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CircleLoader color="#000" size={20} />
              <p className="text-sm text-gray-500">Loading users...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster position="bottom-center" />
    </div>
  );
}
