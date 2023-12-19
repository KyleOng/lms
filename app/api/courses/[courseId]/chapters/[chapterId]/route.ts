import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function PATCH(
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!courseOwner) return new Response("Unauthorized", { status: 401 });

    const { isPublished, ...values } = await req.json();

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    if (values.videoUrl) {
      const existingVideo = await db.muxData.findFirst({
        where: { chapterId },
      });

      if (existingVideo) {
        await Video.Assets.del(existingVideo.assetId);
        await db.muxData.delete({ where: { id: existingVideo.id } });
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false
      });

      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      })
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSE_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
