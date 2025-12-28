export async function generateTrip(prompt) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.text();

}