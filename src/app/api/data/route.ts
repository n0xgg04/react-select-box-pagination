import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);

  const filePath = path.join(
    process.cwd(),
    "src/app/api/data/customers-1000.csv"
  );
  const customers: any[] = [];

  return new Promise((resolve) => {
    setTimeout(() => {
      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: false }))
        .on("error", (error) => {
          resolve(
            NextResponse.json(
              { error: "Error reading CSV file" },
              { status: 500 }
            )
          );
        })
        .on("data", (row) => {
          customers.push({
            id: row[0],
            uniqueId: row[1],
            firstName: row[2],
            lastName: row[3],
            company: row[4],
            city: row[5],
            country: row[6],
            phone1: row[7],
            phone2: row[8],
            email: row[9],
            registrationDate: row[10],
            website: row[11],
          });
        })
        .on("end", () => {
          const totalCustomers = customers.length;
          const totalPages = Math.ceil(totalCustomers / perPage);
          const startIndex = (page - 1) * perPage;
          const endIndex = startIndex + perPage;
          const paginatedCustomers = customers.slice(startIndex, endIndex);

          resolve(
            NextResponse.json({
              totalPages,
              currentPage: page,
              perPage,
              totalCustomers,
              data: paginatedCustomers,
            })
          );
        });
    }, 2000);
  });
}
