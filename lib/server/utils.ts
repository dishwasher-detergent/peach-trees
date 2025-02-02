"use server";

import { addGoalSchema } from "@/components/add-goal";
import { Goal } from "@/interfaces/goal.interface";
import { Result } from "@/interfaces/result.interface";
import {
  COMPLETIONS_COLLECTION_ID,
  COOKIE_KEY,
  DATABASE_ID,
  GOALS_BUCKET_ID,
  GOALS_COLLECTION_ID,
} from "@/lib/constants";
import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID, Permission, Query, Role } from "node-appwrite";
import { z } from "zod";

export async function uploadFile(file: File): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { storage } = await createSessionClient();

  try {
    await storage.createFile(GOALS_BUCKET_ID, ID.unique(), file, [
      Permission.read(Role.user(user.$id)),
      Permission.write(Role.user(user.$id)),
    ]);

    return {
      success: true,
      message: "Your file was uploaded.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Something went wrong, your file was not uploaded. Please try again.",
    };
  }
}

export async function deleteFile(id: string): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { storage } = await createSessionClient();

  try {
    await storage.deleteFile(GOALS_BUCKET_ID, id);

    return {
      success: true,
      message: "Your file was deleted!",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Something went wrong, your file was not deleted. Please try again.",
    };
  }
}

export async function createGoal(
  value: z.infer<typeof addGoalSchema>,
): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    const data = await database.createDocument<Goal>(
      DATABASE_ID,
      GOALS_COLLECTION_ID,
      ID.unique(),
      {
        ...value,
      },
      [
        Permission.read(Role.user(user?.$id)),
        Permission.write(Role.user(user?.$id)),
      ],
    );

    return {
      success: true,
      message: "Your goal was created!",
      data: data,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message:
        "Something went wrong, your goal was not created. Please try again.",
    };
  }
}

export async function updateGoal(
  id: string,
  values: Goal,
): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    const data = await database.updateDocument<Goal>(
      DATABASE_ID,
      GOALS_COLLECTION_ID,
      id,
      {
        ...values,
      },
    );

    return {
      success: true,
      message: "Your goal was updated!",
      data: data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Something went wrong, your goal was not updated. Please try again.",
    };
  }
}

export async function deleteGoal(id: string): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    await database.deleteDocument(DATABASE_ID, GOALS_COLLECTION_ID, id);

    return {
      success: true,
      message: "Your goal was deleted!",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message:
        "Something went wrong, your goal was not updated. Please try again.",
    };
  }
}

export async function getGoals(): Promise<Result<Goal[]>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    const data = await database.listDocuments<Goal>(
      DATABASE_ID,
      GOALS_COLLECTION_ID,
      [Query.orderDesc("$createdAt")],
    );

    const goalPromises = data.documents.map(async (goal) => {
      const completed = await database.listDocuments(
        DATABASE_ID,
        COMPLETIONS_COLLECTION_ID,
        [
          Query.equal("goalId", goal.$id),
          Query.orderAsc("$createdAt"),
          Query.select(["$createdAt"]),
        ],
      );

      goal.completions = completed.documents.map(
        (completion) => completion.$createdAt,
      );

      return goal;
    });

    await Promise.all(goalPromises);

    return {
      success: true,
      message: "Your goals were retrieved!",
      data: data.documents,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message:
        "Something went wrong, your goals were not retrieved. Please try again.",
    };
  }
}

export async function getGoal(id: string): Promise<Result<Goal>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    const data = await database.getDocument<Goal>(
      DATABASE_ID,
      GOALS_COLLECTION_ID,
      id,
    );

    const completed = await database.listDocuments(
      DATABASE_ID,
      COMPLETIONS_COLLECTION_ID,
      [
        Query.equal("goalId", data.$id),
        Query.orderAsc("$createdAt"),
        Query.select(["$createdAt"]),
      ],
    );

    data.completions = completed.documents.map(
      (completion) => completion.$createdAt,
    );

    return {
      success: true,
      message: "Your goal was retrieved!",
      data: data,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message:
        "Something went wrong, your goal was not retrieved. Please try again.",
    };
  }
}

export async function createCompletion(goalId: string): Promise<Result<any>> {
  const user = await getLoggedInUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to perform this action.",
    };
  }

  const { database } = await createSessionClient();

  try {
    const data = await database.createDocument(
      DATABASE_ID,
      COMPLETIONS_COLLECTION_ID,
      ID.unique(),
      {
        goalId: goalId,
      },
      [
        Permission.read(Role.user(user?.$id)),
        Permission.write(Role.user(user?.$id)),
      ],
    );

    return {
      success: true,
      message: "Your completion was saved!",
      data: data,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message:
        "Something went wrong, your goal was not updated. Please try again.",
    };
  }
}

export async function logOut() {
  const { account } = await createSessionClient();

  account.deleteSession("current");
  (await cookies()).delete(COOKIE_KEY);

  redirect("/login");
}
