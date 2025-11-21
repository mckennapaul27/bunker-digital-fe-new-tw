"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatMoney } from "accounting";
import { CircleLoader } from "react-spinners";
import { serverUrl } from "@/config";
import toast, { Toaster } from "react-hot-toast";

type Subscription = {
  _id: string;
  userId: string;
  stripeSubscriptionId: string;
  plan: string;
  productId: string;
  status: string;
  currentPeriodEnd: string;
  currentPeriodStart: string;
  metadata: {
    productId: string;
    userId: string;
  };
  createdAt: string;
  updatedAt: string;
};
type Product = {
  id: string; // matches stripe productId not a mongo id
  name: string;
  description: string;
  price: number;
  currency: string;
};

type UserResponse = {
  _id: string;
  stripeProductsDefault?: string[];
  // other properties are ignored
};

const currencySymbols = {
  usd: "$",
  gbp: "£",
  eur: "€",
};

const excludedProductIds = ["prod_SZLdKpg0z4yXvz"];

export default function SubscriptionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isManagingBilling, setIsManagingBilling] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [availableSubscriptions, setAvailableSubscriptions] = useState<
    Product[]
  >([]);
  const hasInitiallyLoaded = useRef(false);

  // Persist one-off productId stored during public sign-up flow
  const persistStoredProductId = async (
    storedId: string,
    currentDefaults: string[]
  ) => {
    if (!session?.accessToken || !storedId) return;
    if (currentDefaults.includes(storedId)) return;

    try {
      await fetch(`${serverUrl}/api/api-users/add-stripe-product-default`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ productId: storedId }),
      });
    } catch (e) {
      console.error("Failed to persist stored productId", e);
    } finally {
      localStorage.removeItem("productId");
    }
  };

  useEffect(() => {
    const newSubscriptionStatus = searchParams.get("new_subscription");
    let toastId: string | undefined;

    if (newSubscriptionStatus) {
      if (newSubscriptionStatus === "success") {
        toastId = toast.success("Subscription added successfully!", {
          duration: 6000,
        });
      } else if (newSubscriptionStatus === "failed") {
        toastId = toast.error("Failed to add subscription. Please try again.", {
          duration: 6000,
        });
      }
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [searchParams]);

  useEffect(() => {
    if (!session?.accessToken) return;
    const fetchData = async () => {
      if (session?.accessToken) {
        // Only show loading on initial load
        if (!hasInitiallyLoaded.current) {
          setLoading(true);
        }
        setError(null);
        try {
          const [subsResponse, productsResponse, userResponse] =
            await Promise.all([
              fetch(`${serverUrl}/api/api-subscriptions/mine`, {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                },
              }),
              fetch(`${serverUrl}/api/api-stripe-products`, {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                },
              }),
              fetch(`${serverUrl}/api/api-users/${session.user?.id}`, {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                },
              }),
            ]);

          if (!subsResponse.ok) {
            throw new Error("Failed to fetch subscriptions.");
          }
          const subsData = await subsResponse.json();
          setSubscriptions(subsData);

          if (!productsResponse.ok) {
            throw new Error("Failed to fetch products.");
          }
          const productsData = await productsResponse.json();

          setProducts(productsData);

          // Handle user response
          let stripeDefaultProducts: string[] = [];
          if (userResponse.ok) {
            const userJson: UserResponse = await userResponse.json();

            if (Array.isArray(userJson.stripeProductsDefault)) {
              stripeDefaultProducts = userJson.stripeProductsDefault;
            }
          }

          // Persist any productId captured in localStorage to user's defaults
          const storedProductId = localStorage.getItem("productId");
          if (storedProductId) {
            await persistStoredProductId(
              storedProductId,
              stripeDefaultProducts
            );
          }

          // Determine available subscriptions based on user's defaults
          const activeProductIds = subsData
            .filter((sub: Subscription) =>
              ["active", "trialing", "past_due", "incomplete"].includes(
                sub.status
              )
            )
            .map((sub: Subscription) => sub.productId);

          const available = productsData.filter((product: Product) => {
            const allowed =
              stripeDefaultProducts && stripeDefaultProducts.length > 0
                ? stripeDefaultProducts.includes(product.id)
                : false;
            const notActive = !activeProductIds.includes(product.id);
            return allowed && notActive;
          });

          setAvailableSubscriptions(available);
          hasInitiallyLoaded.current = true;
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
    // Use accessToken as dependency instead of entire session object to prevent refetch on window focus
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown Plan";
  };
  const getProductPriceWithCurrency = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product
      ? formatMoney(
          product.price,
          currencySymbols[
            product.currency.toLowerCase() as keyof typeof currencySymbols
          ],
          2
        )
      : "0";
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

  const handleManageBilling = async () => {
    if (!session?.accessToken) return;
    setIsManagingBilling(true);
    try {
      const res = await fetch(`${serverUrl}/api/api-portal/create-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to create billing portal session."
        );
      }

      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("Could not retrieve billing portal URL.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsManagingBilling(false);
    }
  };

  const handleSubscribeClick = async (productId: string) => {
    if (!session?.accessToken) return;

    setIsSubscribing(productId);
    try {
      const res = await fetch(`${serverUrl}/api/api-subscriptions/add-new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        throw new Error(data.message || "Failed to start subscription.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubscribing(null);
    }
  };

  const liveStatuses = ["active", "trialing", "past_due", "incomplete"];
  const visibleSubs = subscriptions.filter((s) =>
    liveStatuses.includes(s.status)
  );

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-gray-500">
              Please log in to view your subscriptions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>
            Manage your active and available subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <CircleLoader color="#000" size={20} />
              <p className="text-sm text-gray-500">Loading subscriptions...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-8">
              {/* Manage All Subscriptions Button */}
              <div className="flex justify-start">
                <Button
                  onClick={handleManageBilling}
                  disabled={isManagingBilling}
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  {isManagingBilling
                    ? "Redirecting..."
                    : "Manage All Subscriptions"}
                </Button>
              </div>

              {/* Active Subscriptions */}
              <div className="space-y-4">
                <p className="text-base font-medium text-charcoal">
                  Active Subscriptions
                </p>
                {visibleSubs.length > 0 ? (
                  <div className="space-y-3">
                    {visibleSubs.map((sub) => (
                      <Card key={sub.stripeSubscriptionId}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-semibold text-charcoal text-sm">
                                {getProductName(sub.productId)}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-600">
                                <span>
                                  {getProductPriceWithCurrency(sub.productId)}{" "}
                                  per month
                                </span>
                                <span>•</span>
                                <span>
                                  Renews:{" "}
                                  {new Date(
                                    sub.currentPeriodEnd
                                  ).toLocaleDateString()}
                                </span>
                                <Badge
                                  variant={
                                    getStatusBadgeVariant(sub.status) as
                                      | "default"
                                      | "secondary"
                                      | "destructive"
                                      | "outline"
                                  }
                                  className={getStatusBadgeClassName(
                                    sub.status
                                  )}
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
                ) : (
                  <p className="text-sm text-gray-500">
                    You have no active subscriptions.
                  </p>
                )}
              </div>

              {/* Available Subscriptions */}
              <div className="space-y-4">
                <p className="text-base font-medium text-charcoal">
                  Available Subscriptions
                </p>
                {availableSubscriptions.filter(
                  (sub) => !excludedProductIds.includes(sub.id)
                ).length > 0 ? (
                  <div className="space-y-3">
                    {availableSubscriptions
                      .filter((sub) => !excludedProductIds.includes(sub.id))
                      .map((sub) => (
                        <Card key={sub.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex-1">
                                <p className="font-semibold text-charcoal text-sm">
                                  {sub.name}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {formatMoney(
                                    sub.price,
                                    currencySymbols[
                                      sub.currency.toLowerCase() as keyof typeof currencySymbols
                                    ],
                                    2
                                  )}{" "}
                                  per month
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleSubscribeClick(sub.id)}
                              disabled={isSubscribing === sub.id}
                              className="w-full sm:w-auto mt-8"
                              size="sm"
                            >
                              {isSubscribing === sub.id
                                ? "Processing..."
                                : "Set Up"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No other subscriptions available at this time.
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster position="bottom-center" />
    </div>
  );
}
