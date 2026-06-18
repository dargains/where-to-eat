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

const FUNNY_INSULTS = [
  "Deixa o pobre restaurante em paz! Está bloqueado!",
  "5 vezes? Escolhe um e come! Bloqueado!",
  "Que falta de decisão! Isto é um restaurante ou um videoclip? Bloqueado!",
  "Pronto, bloqueado! Já deste 5 oportunidades à comida!",
  "Tens muita coragem pedir mais! Está bloqueado, caro amigo!",
  "5 chances é o suficiente! Vai com a primeira! Bloqueado!",
  "Nem o Michelin pede tanto! Bloqueado!",
  "Chega! Manda a moeda para o ar que fica melhor! Bloqueado!",
];

export default function LunchSuggester() {
  const [place, setPlace] = useState<LunchPlaceDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState<string>("");
  const [clickCount, setClickCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState<string>("");

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
    if (isBlocked) return;

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= 5) {
      setIsBlocked(true);
      const randomInsult =
        FUNNY_INSULTS[Math.floor(Math.random() * FUNNY_INSULTS.length)];
      setBlockMessage(randomInsult);
      return;
    }

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
    if (isBlocked) return "🚫 Já chega!";
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
          disabled={loading || isBlocked}
          className={styles.button}
        >
          {buttonLabel()}
        </button>

        {isBlocked && (
          <div className={styles.blockedMessage}>
            <p className={styles.insult}>{blockMessage}</p>
          </div>
        )}

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
