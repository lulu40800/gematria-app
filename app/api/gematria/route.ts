// API route for gematria calculations

import { NextRequest, NextResponse } from "next/server";
import { calculateGematria } from "@/lib/gematria";
import { GematriaResult } from "@/lib/gematriaTypes";

// Next.js App Router handles body parsing automatically
// Default limit is sufficient for our use case (up to 400k characters)

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        if (!body.text || typeof body.text !== 'string') {
            return NextResponse.json(
                { error: "text field is required and must be a non-empty string" },
                { status: 400 }
            );
        }

        const text = body.text;

        // Calculate gematria
        const result: GematriaResult = calculateGematria(text);

        // Return result
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("Error in /api/gematria:", error);
        return NextResponse.json(
            { error: "internal_server_error" },
            { status: 500 }
        );
    }
}
