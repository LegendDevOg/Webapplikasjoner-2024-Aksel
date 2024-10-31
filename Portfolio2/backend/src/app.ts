import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (res) => {
    return res.json({
      data: [
        {
          id: crypto.randomUUID(),
          title: "Miljøprosjekt A",
          description: "Et prosjekt for å redusere plastavfall.",
          createdAt: new Date("2024-01-01"),
          categories: ["Miljø"]
        },
        {
          id: crypto.randomUUID(),
          title: "Solenergi Prosjekt B",
          description: "Installering av solcellepaneler i skoler.",
          createdAt: new Date("2024-02-01"),
          categories: ["Energi"]
        },
        {
          id: crypto.randomUUID(),
          title: "Teknologiprosjekt C",
          description: "Utvikling av en ny mobilapp.",
          createdAt: new Date("2024-03-15"),
          categories: ["Teknologi"]
        }
      ]
    });
  });

export default app;