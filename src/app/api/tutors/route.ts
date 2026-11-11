/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import { NextResponse } from "next/server";
import tutores from "@/data/tutores.json";

export async function GET() {
  return NextResponse.json(tutores);
}