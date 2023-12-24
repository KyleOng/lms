import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  purchases.forEach((purchase) => {
    const { course } = purchase;
    const courseTitle = course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += 1;
  });
  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupEarnings = groupByCourse(purchases);
    const data = Object.entries(groupEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total,
    }));

    const totalRevenue = purchases.length;
    const totalSales = data.reduce((acc, curr) => acc + curr.total, 0);
    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET ANALYTICS ERROR]: ", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
