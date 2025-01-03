import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (res) => {
  return res.json({
    data: [
      {
        id: 1,
        name: "Miljøprosjekt A",
        description: "Et prosjekt for å redusere plastavfall i nærområdet.",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        status: "active",
        goals: [
          {
            id: 1,
            description: "Redusere plastavfall med 30% innen prosjektets slutt."
          },
          {
            id: 2,
            description: "Involvere minst 200 frivillige i opprydningsarbeidet."
          }
        ]
      },
      {
        id: 2,
        name: "Solenergi Prosjekt B",
        description: "Installering av solcellepaneler i lokale skoler.",
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        status: "planning",
        goals: [
          {
            id: 1,
            description: "Installere 50 solcellepaneler innen utgangen av året."
          },
          {
            id: 2,
            description: "Redusere skolens energikostnader med 20%."
          }
        ]
      }
    ]
  });
});

export default app;