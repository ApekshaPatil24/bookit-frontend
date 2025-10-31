//Calls backend APIs (get, post bookings, etc.)

export type Experience = {
  id: string;
  title: string;
  shortDesc: string;
  location: string;
  basePrice: number;
  coverImage: string;
  tags?: string[];
};


export async function fetchExperiences(): Promise<Experience[]> {
  const res = await fetch("https://bookit-backend-ouc2.onrender.com/api/experiences");
  if (!res.ok) throw new Error("Failed to fetch experiences");

  const data = await res.json();

  // Normalize fields for frontend compatibility
  return data.map((exp: any) => ({
    id: exp.id,
    title: exp.title,
    shortDesc: exp.description, //  match expected prop
    location: exp.location,
    basePrice: exp.price, // match ExperienceCard
    coverImage: exp.imageUrl, // match ExperienceCard
    tags: ["Adventure"], // optional placeholder (for now)
  }));
}
