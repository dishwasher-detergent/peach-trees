"use server";

import { Goal } from "@/interfaces/goal.interface";
import { Result } from "@/interfaces/result.interface";
import {
  COOKIE_KEY,
  DATABASE_ID,
  GOALS_BUCKET_ID,
  GOALS_COLLECTION_ID,
} from "@/lib/constants";
import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";

import { cookies } from "next/headers";
import { ID, Permission, Role } from "node-appwrite";

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

export async function createGoal(title: string): Promise<Result<Goal>> {
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
        title: title,
        createdBy: user.$id,
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
    return {
      success: false,
      message:
        "Something went wrong, your goal was not updated. Please try again.",
    };
  }
}

export async function signOut() {
  const { account } = await createSessionClient();

  account.deleteSession("current");
  (await cookies()).delete(COOKIE_KEY);
}
