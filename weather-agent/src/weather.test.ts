import assert from "node:assert/strict";
import { test } from "node:test";
import Anthropic from "@anthropic-ai/sdk";
import { getWeather, run } from "./weather.ts";

test("getWeather ignora mayúsculas y tildes", () => {
  assert.equal(getWeather(" PARÍS ")?.temperatureC, 12);
  assert.equal(getWeather("Lima"), undefined);
});

// API simulada: sin red, sin clave y sin coste.
function fakeClient(replies: { content: unknown[]; stop_reason: string }[]) {
  const requests: any[] = [];
  const client = new Anthropic({
    apiKey: "test",
    fetch: async (_url, init) => {
      requests.push(JSON.parse(String(init?.body)));
      const reply = replies[requests.length - 1];
      return Response.json({
        id: `msg_${requests.length}`, type: "message", role: "assistant",
        model: "claude-opus-5-5", stop_sequence: null,
        usage: { input_tokens: 1, output_tokens: 1 }, ...reply,
      });
    },
  });
  return { client, requests };
}

test("run ejecuta la herramienta y devuelve el texto final", async () => {
  const { client, requests } = fakeClient([
    { stop_reason: "tool_use", content: [{ type: "tool_use", id: "toolu_1", name: "get_weather", input: { city: "Madrid" } }] },
    { stop_reason: "end_turn", content: [{ type: "text", text: "18 °C y soleado" }] },
  ]);
  assert.equal(await run("¿Madrid?", client), "18 °C y soleado");
  assert.equal(requests.length, 2);
  assert.match(JSON.stringify(requests[1].messages.at(-1)), /tool_result.*soleado/);
});

test("run falla si Claude rechaza la petición", async () => {
  const { client } = fakeClient([{ stop_reason: "refusal", content: [] }]);
  await assert.rejects(run("hola", client), /refusal/);
});
