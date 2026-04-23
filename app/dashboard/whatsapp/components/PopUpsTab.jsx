import React from "react";
import { apiRequest } from "@/api/fetchApiWhatsApp";
import { Card, CardTitle } from "./TabButton";

export function PopupsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Pop ups</CardTitle>
      </Card>
    </div>
  );
}
