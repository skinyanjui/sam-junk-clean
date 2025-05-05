
import { LocationData } from '@/types/locations';

export const serviceLocations: LocationData[] = [
  {
    id: 1,
    name: "Indiana",
    isPrimary: true,
    serviceRadius: "30+ miles from Evansville",
    primaryCity: "Evansville",
    contactPhone: "(800) 555-1234",
    contactEmail: "indiana@unclesamjunk.com",
    serviceAreas: [
      "Evansville", 
      "Newburgh", 
      "Boonville",
      "Princeton",
      "Vincennes",
      "Mt. Vernon",
      "Washington",
      "Jasper"
    ],
    description: "Our primary service area covers most of Southern Indiana, with same-day service available in many locations.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    name: "Kentucky",
    isPrimary: false,
    serviceRadius: "25+ miles from Owensboro",
    primaryCity: "Owensboro",
    contactPhone: "(800) 555-5678",
    contactEmail: "kentucky@unclesamjunk.com",
    serviceAreas: [
      "Owensboro",
      "Henderson", 
      "Madisonville",
      "Calhoun",
      "Hartford",
      "Central City",
      "Beaver Dam",
      "Hawesville"
    ],
    description: "We service Northwestern Kentucky communities with professional junk removal, typically with 1-2 day response times.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    name: "Illinois",
    isPrimary: false,
    serviceRadius: "20+ miles from Mt. Carmel",
    primaryCity: "Mt. Carmel",
    contactPhone: "(800) 555-9012",
    contactEmail: "illinois@unclesamjunk.com",
    serviceAreas: [
      "Mt. Carmel", 
      "Grayville", 
      "Fairfield",
      "Carmi",
      "Albion",
      "Crossville",
      "West Salem",
      "Olney"
    ],
    description: "Serving Southeastern Illinois communities with scheduled junk removal services on designated days each week.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  }
];
