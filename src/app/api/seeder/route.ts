import { prisma } from "@api/utils";
import { NextRequest, NextResponse } from "next/server";
import { PRODUCT_TITLES } from "./data/product_titles";
import { PRODUCT_DESCRIPTIONS } from "./data/product_descriptions";
import { PRODUCT_CONTENT } from "./data/product_content";
import { PRODUCT_SPECS } from "./data/product_specs";
import { PRODUCT_VARIANTS } from "./data/product_variants";
import { CATEGORIES, SUB_CATEGORIES } from "./data/product_categories";
import { DISCOUNT_GROUPS } from "./data/discount_groups";

/*
    Database seeder route
    ---------------------
    This route is used to seed the database with initial data.
    It is only accessible with a secret key.

    The data should be for a fresh database, so it should not be used
    to update existing data.

    The theme of the data is home office supplies,
    such as desks and chairs, designer decor, electroncis, etc.

    Prices should be in EUR.
    Titles, descriptions and specs should be in English.

    Titles should be unique and interesting, not just "Desk 1", "Desk 2", etc.
*/
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");

  if (secret !== process.env.POSTGRES_SEED_PASSWORD) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await seedDatabase();

  return NextResponse.json({ message: "success" });
}

async function seedDatabase() {
  await clearDatabase();
  await createCategories();

  const categories = await prisma.category.findMany();
  const subCategories = categories.filter((category) => category.parentId);

  await createDiscountGroups();

  await createProducts(subCategories);
  const products = await prisma.product.findMany();
  const productIds = products.map((product) => product.id);

  const discountGroups = await prisma.discountGroup.findMany();
  const discountGroupIds = discountGroups.map((group) => group.id);

  // link products to categories
  await Promise.all(
    productIds.map(async (productId, index) => {
      await prisma.product.update({
        where: { id: productId },
        data: {
          category: {
            connect: {
              id: subCategories[index % subCategories.length].id,
            },
          },
        },
      });
    }),
  );

  // link a few products to discount groups
  await Promise.all(
    productIds.map(async (productId, index) => {
      if (index % 3 === 0) {
        await prisma.product.update({
          where: { id: productId },
          data: {
            discountGroup: {
              connect: {
                id: discountGroupIds[index % discountGroupIds.length],
              },
            },
          },
        });
      }
    }),
  );

  // link a few categories to discount groups
  await Promise.all(
    categories.map(async (category: { id: any }, index: number) => {
      if (index % 2 === 0) {
        await prisma.category.update({
          where: { id: category.id },
          data: {
            discountGroup: {
              connect: {
                id: discountGroupIds[index % discountGroupIds.length],
              },
            },
          },
        });
      }
    }),
  );
}

const clearDatabase = async () => {
  await prisma.discountGroup.deleteMany({});
  await prisma.productContent.deleteMany({});
  await prisma.productSpec.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({
    where: {
      parentId: {
        not: null,
      },
    },
  });
  await prisma.category.deleteMany({
    where: {
      parentId: null,
    },
  });
};

const createCategories = async () => {
  await prisma.category.createMany({
    data: CATEGORIES.map((title) => ({ title })),
  });

  const categories = await prisma.category.findMany();
  const categoryIdList = categories.map((category) => category.id);

  await prisma.category.createMany({
    data: SUB_CATEGORIES.map((title, index) => ({
      title,
      parentId: categoryIdList[index % categoryIdList.length],
    })),
  });
};

const createProducts = async (
  categories: {
    id: number;
    title: string;
    parentId: number | null;
    discountGroupId: number | null;
  }[],
) => {
  await Promise.all(
    PRODUCT_TITLES.map(async (title, index) => {
      return prisma.product.create({
        data: {
          productNumber: `PNUM-${index + 1}`,
          sku: `SKU-${index + 1}`,
          slug: title.toLowerCase().replace(/\s/g, "-"),
          title,
          category: {
            connect: {
              id: categories[index % categories.length].id,
            },
          },
          description: PRODUCT_DESCRIPTIONS[index],
          variants: {
            create: PRODUCT_VARIANTS[index],
          },
          content: {
            create: PRODUCT_CONTENT[index],
          },
          productSpec: {
            create: PRODUCT_SPECS[index],
          },
        },
      });
    }),
  );
};

const createDiscountGroups = async () => {
  await prisma.discountGroup.createMany({
    data: DISCOUNT_GROUPS,
  });
};
