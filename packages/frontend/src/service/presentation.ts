import { IPresentation, IPresentationSummary } from "../types/presentation";

const API_URL: string = "http://localhost:3000/api/v1"; // add it to .env

export const fetchPresentations = async (): Promise<
  IPresentationSummary[] | null
> => {
  try {
    const response = await fetch(`${API_URL}/presentations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch presentations: ${response.statusText}`);
    }
    const fetchedPresentations: IPresentationSummary[] = await response.json();
    return fetchedPresentations;
  } catch (error) {
    console.error("Error fetching presentations:", error);
    throw error;
  }
};

export const getPresentationById = async (
  id: string
): Promise<IPresentation | null> => {
  try {
    const response = await fetch(`${API_URL}/presentations/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch presentation: ${response.statusText}`);
    }
    const presentation = (await response.json()) as IPresentation;
    return presentation;
  } catch (error) {
    console.error("Error fetching presentations:", error);
    throw error;
  }
};

export const createPresentation = async (
  title: string
): Promise<IPresentationSummary | null> => {
  try {
    const response = await fetch(`${API_URL}/presentations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create presentation: ${response.statusText}`);
    }

    const createdPresentation: IPresentationSummary = await response.json();
    return createdPresentation;
  } catch (error) {
    console.error("Error creating presentation:", error);
    throw error;
  }
};

export const updatePresentation = async (
  id: string,
  presentation: IPresentation
) => {
  console.log("presentation... from", presentation);
  try {
    const response = await fetch(`${API_URL}/presentations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(presentation),
    });
    if (!response.ok) {
      throw new Error(`Failed to update presentation: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error updating presentation:", error);
    throw error;
  }
};

export const deletePresentation = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/presentations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete presentation: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting presentation:", error);
    throw error;
  }
};
