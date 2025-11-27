const API_URL = "http://localhost:8000/api/v1";

export async function fetchCampaigns() {
  const res = await fetch(`${API_URL}/campaigns`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}

export async function fetchOpportunities() {
  const res = await fetch(`${API_URL}/opportunities`);
  if (!res.ok) throw new Error("Failed to fetch opportunities");
  return res.json();
}

export async function fetchPerformance() {
  const res = await fetch(`${API_URL}/performance`);
  if (!res.ok) throw new Error("Failed to fetch performance");
  return res.json();
}

export async function triggerSimulation() {
  const res = await fetch(`${API_URL}/simulate/step`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to trigger simulation");
  return res.json();
}
