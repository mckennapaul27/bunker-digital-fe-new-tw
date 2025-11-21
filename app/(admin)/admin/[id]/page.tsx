"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { serverUrl } from "@/config";
import { formatMoney } from "accounting";
import { CircleLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
}

interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "client" | "admin";
  stripeProductsDefault?: string[];
}

interface Subscription {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  status: string;
}

const currencySymbols: Record<string, string> = {
  usd: "$",
  gbp: "£",
  eur: "€",
};

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "default";
    case "trialing":
      return "secondary";
    case "past_due":
      return "destructive";
    case "incomplete":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusBadgeClassName = (status: string) => {
  if (status.toLowerCase() === "active") {
    return "bg-green-500 text-white border-green-500 hover:bg-green-600";
  }
  return "";
};

export default function AdminUserProfile() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string);

  const [user, setUser] = useState<User | null>(null);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const hasInitiallyLoaded = useRef(false);

  useEffect(() => {
    if (!session?.accessToken || !userId) return;

    const fetchData = async () => {
      // Only show loading on initial load
      if (!hasInitiallyLoaded.current) {
        setLoading(true);
      }
      setError(null);
      try {
        const [userRes, subsRes, productsRes] = await Promise.all([
          fetch(`${serverUrl}/api/api-users/admin/${userId}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
          fetch(`${serverUrl}/api/api-users/admin/subscriptions/${userId}`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
          fetch(`${serverUrl}/api/api-stripe-products`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }),
        ]);
        const userJson = await userRes.json();
        const subsJson = await subsRes.json();
        const productsJson = await productsRes.json();
        setProducts(productsJson);
        if (!userRes.ok)
          throw new Error(userJson.message || "Failed to load user");
        if (!subsRes.ok)
          throw new Error(subsJson.message || "Failed to load subscriptions");
        if (!productsRes.ok)
          throw new Error(productsJson.message || "Failed to load products");
        setUser(userJson);
        setSubs(subsJson);
        setSelected(
          Array.isArray(userJson.stripeProductsDefault)
            ? userJson.stripeProductsDefault
            : []
        );
        hasInitiallyLoaded.current = true;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Use accessToken as dependency instead of entire session object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken, userId]);

  const toggleProduct = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSaveProducts = async () => {
    if (!session?.accessToken) return;
    setSaving(true);
    try {
      const res = await fetch(
        `${serverUrl}/api/api-users/admin/set-stripe-products-default/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ productIds: selected }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save products");
      toast.success("Products updated");
      setUser(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-500">
              Please log in to view user details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !hasInitiallyLoaded.current) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <CircleLoader color="#000" size={20} />
              <p className="text-sm text-gray-500">Loading user...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  const userName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle>{userName}</CardTitle>
          <CardDescription>User details and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-medium text-charcoal">Email: </span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div>
            <span className="font-medium text-charcoal">Role: </span>
            <span className="text-gray-600 capitalize">{user.role}</span>
          </div>
        </CardContent>
      </Card>

      {/* Assign Packages */}
      <Card>
        <CardHeader>
          <CardTitle>Assign Packages</CardTitle>
          <CardDescription>
            Select which packages this user can subscribe to
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {products.length > 0 ? (
            <div className="space-y-3">
              {products.map((prod) => {
                const checked = selected.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => toggleProduct(prod.id)}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleProduct(prod.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-charcoal">
                          {prod.name}
                        </span>
                        <span className="text-gray-600">–</span>
                        <span className="text-gray-600">
                          {formatMoney(
                            prod.price,
                            currencySymbols[prod.currency.toLowerCase()],
                            2
                          )}
                        </span>
                      </div>
                      {prod.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {prod.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products available.</p>
          )}
          <div className="pt-4">
            <Button
              onClick={handleSaveProducts}
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? "Saving…" : "Save Packages"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>User's active subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {subs.length === 0 ? (
            <p className="text-sm text-gray-500">No subscriptions</p>
          ) : (
            <div className="space-y-3">
              {subs.map((sub) => (
                <Card key={sub.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-charcoal text-sm">
                          {sub.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-600">
                          <span>
                            {formatMoney(
                              sub.price,
                              currencySymbols[sub.currency.toLowerCase()],
                              2
                            )}{" "}
                            per month
                          </span>
                          <Badge
                            variant={
                              getStatusBadgeVariant(sub.status) as
                                | "default"
                                | "secondary"
                                | "destructive"
                                | "outline"
                            }
                            className={getStatusBadgeClassName(sub.status)}
                          >
                            {sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1).replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Toaster position="bottom-center" />
    </div>
  );
}
