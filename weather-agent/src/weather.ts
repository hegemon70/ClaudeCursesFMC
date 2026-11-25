import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

// Datos fijos, como en la lección: no se consulta ningún servicio meteorológico.
const weatherByCity = new Map([
  ["madrid", { temperatureC: 18, conditions: "soleado" }],
  ["paris", { temperatureC: 12, conditions: "nublado" }],
  ["tokio", { temperatureC: 16, conditions: "lluvia ligera" }],
]);

// "París" -> "paris"
const normalize = (city: string) =>
  city.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");

export function getWeather(city: string) {
  return weatherByCity.get(normalize(city));
}

// 1. Definir la herramienta
const weatherTool = betaZodTool({
  name: "get_weather",
  description: "Obtiene la temperatura y las condiciones actuales de una ciudad.",
  inputSchema: z.object({
    city: z.string().describe("Solo el nombre de la ciudad, en español; p. ej. Madrid"),
  }),
  run: ({ city }) => {
    const weather = getWeather(city);
    return weather
      ? JSON.stringify({ city, ...weather })
      : `No hay datos para ${city}. Ciudades disponibles: Madrid, París, Tokio.`;
  },
});

// 2. Entregarla al tool runner, que gestiona el bucle del agente
export async function run(prompt: string, client = new Anthropic()) {
  const message = await client.beta.messages.toolRunner({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    max_iterations: 5,
    thinking: { type: "adaptive" },
    // Si los filtros de seguridad rechazan la petición, otro modelo la reintenta.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    tools: [weatherTool],
    messages: [{ role: "user", content: prompt }],
  });

  if (message.stop_reason !== "end_turn") {
    throw new Error(`Respuesta incompleta (stop_reason: ${message.stop_reason})`);
  }

  // 3. Devolver el resultado
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");
}

if (import.meta.main) {
  try {
    console.log(await run(process.argv[2] ?? "¿Qué tiempo hace en Madrid y en París?"));
  } catch (error) {
    process.exitCode = 1;
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Credenciales no válidas: revisa ANTHROPIC_API_KEY.");
    } else if (error instanceof Anthropic.RateLimitError) {
      console.error("Límite de peticiones alcanzado: inténtalo más tarde.");
    } else if (error instanceof Anthropic.APIConnectionError) {
      console.error("No se pudo conectar con la API:", error.message);
    } else if (error instanceof Anthropic.APIError) {
      console.error(`Error ${error.status} de la API:`, error.message);
    } else {
      console.error(error instanceof Error ? error.message : error);
    }
  }
}
