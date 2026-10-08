"use client";

import { useState } from "react";
import { Icon } from "./ui";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="w-full max-w-[420px]"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:hello@qorpe.com?subject=Train%20notes&body=${encodeURIComponent(`Please add ${email} to the train notes.`)}`;
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
      <div className="field">
        <input id="newsletter-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" />
        <button type="submit" aria-label="Subscribe"><Icon name="send" size={14} className="rotate-90" /></button>
      </div>
    </form>
  );
}
