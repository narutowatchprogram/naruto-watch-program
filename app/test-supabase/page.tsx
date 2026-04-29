"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .limit(5);

      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
    }

    test();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Test</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}

      {!data && !error && <p>Loading...</p>}
    </div>
  );
}