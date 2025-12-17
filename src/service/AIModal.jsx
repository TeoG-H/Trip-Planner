export async function generateTrip(prompt) {
  const res = await fetch("http://localhost:3001/api/generate-trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.text();

}
