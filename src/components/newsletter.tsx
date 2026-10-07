"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="flex w-full max-w-[420px] gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:hello@qorpe.com?subject=Train%20notes&body=${encodeURIComponent(`Please add ${email} to the train notes.`)}`;
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-10 flex-1 rounded-[10px] border border-line-2 bg-white px-3.5 text-base font-medium text-ink placeholder:text-gray-2 focus:border-ink focus:outline-none"
      />
      <button type="submit" className="btn btn-primary btn-lg">Subscribe</button>
    </form>
  );
}
