import { env } from "@/lib/env";
import { s3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json(
        { error: "Mission or invalid object key" },
        { status: 400 },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);

    return NextResponse.json(
      {
        message: "File deleted successfuly",
      },
      { status: 200 },
    );
  } catch (error) {}
}
