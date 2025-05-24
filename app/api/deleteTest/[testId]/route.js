import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Test from "@/lib/models/Test";

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { testId } = params;
    if (!testId) {
      return NextResponse.json(
        { error: "TestId not recieved!" },
        { status: 404 }
      );
    }
    const match = await Test.deleteOne({ _id: testId });
    if (match.deletedCount === 0) {
      return NextResponse.json({ error: "Test not found!" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Test deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
