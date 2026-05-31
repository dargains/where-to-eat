"use client";

import { useState } from "react";
import Link from "next/link";
import { LunchPlace } from "@/lib/database";
import styles from "./LunchSuggester.module.css";

export default function LunchSuggester() {
  const [place, setPlace] = useState<LunchPlace | null>(null);
  const [loading, setLoading] = useState(false);

  const getPriceLabel = (price: number) => {
    if (price === 1) return "$";
    if (price === 2) return "$$";
    return "$$$";
  };

  const handleGetSuggestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/random-place");
      const data = await response.json();
      setPlace(data);
    } catch (error) {
      console.error("Error fetching place:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bora almoçar!
      </h1>

      <button
        onClick={handleGetSuggestion}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Loading..." : "Get Random Place"}
      </button>

      <Link href="/add-place" className={styles.addLink}>
        + Add New Place
      </Link>

      {place && (
        <div className={styles.resultCard}>
          <h2 className={styles.restaurantName}>
            {place.name}
          </h2>
          <div className={styles.infoSection}>
            <p className={styles.infoItem}>
              <strong>Address:</strong> {place.address}
            </p>
            <p className={styles.infoItem}>
              <strong>Price Level:</strong> {getPriceLabel(place.price)}
            </p>
            <p className={styles.infoItem}>
              <strong>Distance:</strong> {place.distance} km
            </p>
          </div>
        </div>
      )}

      {!place && (
        <p className={styles.placeholderText}>
          Click the button to get a lunch suggestion!
        </p>
      )}
    </div>
  );
}
