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
        setMessage({ type: "error", text: "Por favor, preencha todos os campos" });
        setLoading(false);
        return;
      }

      const distance = parseFloat(formData.distance);
      if (isNaN(distance) || distance < 0) {
        setMessage({
          type: "error",
          text: "A distância deve ser um número positivo",
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
        throw new Error("Erro ao adicionar restaurante");
      }

      setMessage({
        type: "success",
        text: `${formData.name} adicionado com sucesso!`,
      });
      setFormData({ name: "", address: "", price: 2, distance: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao adicionar restaurante",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Voltar
      </Link>

      <h1 className={styles.title}>Adicionar Novo Restaurante</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nome do Restaurante
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ex., Pizza Cenas"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ex., Rua das Cenas, 42"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Nível de Preço
            </label>
            <select
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.select}
              disabled={loading}
            >
              <option value={1}>€ - Baratinho</option>
              <option value={2}>€€ - Médio</option>
              <option value={3}>€€€ - Caro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="distance" className={styles.label}>
              Distância (km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="ex., 1.5"
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
          {loading ? "A adicionar..." : "Adicionar Restaurante"}
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
