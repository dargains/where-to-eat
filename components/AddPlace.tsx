"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./AddPlace.module.css";

export default function AddPlace() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: 2,
    distance: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!formData.name || !formData.address || !formData.distance) {
        setMessage({ type: "error", text: "Please fill in all fields" });
        setLoading(false);
        return;
      }

      const distance = parseFloat(formData.distance);
      if (isNaN(distance) || distance < 0) {
        setMessage({
          type: "error",
          text: "Distance must be a positive number",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("/api/add-place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          price: formData.price,
          distance,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add place");
      }

      setMessage({
        type: "success",
        text: `${formData.name} added successfully!`,
      });
      setFormData({ name: "", address: "", price: 2, distance: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to add place",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Suggestions
      </Link>

      <h1 className={styles.title}>Add a New Lunch Place</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Pizza Palace"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., 123 Main Street"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price Level
            </label>
            <select
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.select}
              disabled={loading}
            >
              <option value={1}>$ - Budget</option>
              <option value={2}>$$ - Moderate</option>
              <option value={3}>$$$ - Expensive</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="distance" className={styles.label}>
              Distance (km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="e.g., 1.5"
              step="0.1"
              min="0"
              className={styles.input}
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Adding..." : "Add Place"}
        </button>
      </form>

      {message && (
        <div
          className={`${styles.message} ${styles[`message-${message.type}`]}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
