import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Obtén el directorio del archivo actual (equivalente a __dirname en CommonJS)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const prisma = new PrismaClient();

async function importData() {
  console.log("Iniciando importación de datos...");
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data.json"), "utf-8"),
  );

  try {
    console.log("Insertando datos...");
    await prisma.reservation.createMany({ data: data });
    console.log("Datos importados correctamente.");
  } catch (error) {
    console.error("Error al importar los datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Llama a la función de importación
importData().catch((e) => {
  console.error(e);
  process.exit(1);
});
