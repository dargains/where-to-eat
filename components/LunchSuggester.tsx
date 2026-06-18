"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LunchPlaceDTO } from "@/lib/database";
import styles from "./LunchSuggester.module.css";

const LUNCH_PHRASES = [
  ", estou cheio de fome!",
  ", já são 12h!",
  ", é hora!",
  ", faz logo push!",
  ", fecha o portátil!",
  ", vamos logo!",
  ", tenho fome!",
  ", vamos lá!",
  ", não aguento mais esperar!",
  ", não como há horas!",
  ", estou com fome há muito tempo!",
  ", não consigo esperar mais!",
];

export default function LunchSuggester() {
  const [place, setPlace] = useState<LunchPlaceDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState<string>("");

  useEffect(() => {
    const randomPhrase =
      LUNCH_PHRASES[Math.floor(Math.random() * LUNCH_PHRASES.length)];
    setPhrase(randomPhrase);
  }, []);

  const getPriceLabel = (price: number) => {
    if (price === 1) return "€";
    if (price === 2) return "€€";
    return "€€€";
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

  const buttonLabel = () => {
    if (loading) return "Que fome...";
    if (place) return "Ahh esse não, quero outro";
    return "Dá-me um lugar faixavor!";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bora almoçar{phrase}
        </h1>

        <button
          onClick={handleGetSuggestion}
          disabled={loading}
          className={styles.button}
        >
          {buttonLabel()}
        </button>

        {place && (
          <a
            className={styles.resultCard}
            href={`https://www.google.com/maps/search/${encodeURIComponent(place.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >

            <h2 className={styles.restaurantName}>
              {place.name}
            </h2>
            <p className={styles.infoItem}>
              <strong>Nível de Preço:</strong> {getPriceLabel(place.price)}
            </p>
            <p className={styles.infoItem}>
              <strong>Morada:</strong> {place.address}
            </p>
            <p className={styles.infoItem}>
              <strong>Distância da Vodafone:</strong> {place.distance} km
            </p>
          </a>
        )}

        <Link href="/add-place" className={styles.addLink}>
          + Adicionar restaurante
        </Link>
      </div>
      <Link href="/add-place" className={styles.addLinkMobile}>
        ➕
      </Link>
      <footer className={styles.footer}>
        Made with 🍕 by André Dargains
      </footer>
    </div>
  );
}
