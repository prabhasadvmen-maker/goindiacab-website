// Curated airport list for the Airport tab (name + city, major airports with their terminals).
// `popular` ones are shown when the field is focused with nothing typed.
export type Airport = { label: string; popular?: boolean };

export const AIRPORTS: Airport[] = [
  { label: "Terminal 1 C - Arrival, Indira Gandhi International Airport, New Delhi", popular: true },
  { label: "Terminal 1 D - Departure, Indira Gandhi International Airport, New Delhi", popular: true },
  { label: "Terminal 2, Indira Gandhi International Airport, New Delhi", popular: true },
  { label: "Terminal 3, Indira Gandhi International Airport, New Delhi", popular: true },
  { label: "Noida International Airport (Jewar), Greater Noida" },
  { label: "Terminal 1, Chhatrapati Shivaji International Airport, Mumbai", popular: true },
  { label: "Terminal 2, Chhatrapati Shivaji International Airport, Mumbai", popular: true },
  { label: "Terminal 1, Kempegowda International Airport, Bangalore", popular: true },
  { label: "Terminal 2, Kempegowda International Airport, Bangalore", popular: true },
  { label: "Chennai Domestic Airport, Chennai", popular: true },
  { label: "Chennai International Airport, Chennai", popular: true },
  { label: "Netaji Subhas Chandra Bose International Airport, Kolkata", popular: true },
  { label: "Rajiv Gandhi International Airport, Hyderabad", popular: true },
  { label: "Sardar Vallabhbhai Patel International Airport, Ahmedabad" },
  { label: "Pune International Airport, Pune" },
  { label: "Dabolim Airport, Goa" },
  { label: "Manohar International Airport (Mopa), Goa" },
  { label: "Cochin International Airport, Kochi" },
  { label: "Trivandrum International Airport, Thiruvananthapuram" },
  { label: "Chaudhary Charan Singh International Airport, Lucknow", popular: true },
  { label: "Jaipur International Airport, Jaipur", popular: true },
  { label: "Chandigarh International Airport, Chandigarh", popular: true },
  { label: "Sri Guru Ram Dass Jee International Airport, Amritsar" },
  { label: "Lal Bahadur Shastri International Airport, Varanasi" },
  { label: "Jolly Grant Airport, Dehradun" },
  { label: "Maharishi Valmiki International Airport, Ayodhya" },
  { label: "Prayagraj Airport, Prayagraj" },
  { label: "Gorakhpur Airport, Gorakhpur" },
  { label: "Kanpur Airport (Chakeri), Kanpur" },
  { label: "Agra Airport (Kheria), Agra" },
  { label: "Pantnagar Airport, Pantnagar" },
  { label: "Jammu Airport, Jammu" },
  { label: "Sheikh ul-Alam International Airport, Srinagar" },
  { label: "Leh Kushok Bakula Rimpochee Airport, Leh" },
  { label: "Kullu Manali Airport (Bhuntar), Kullu" },
  { label: "Shimla Airport, Shimla" },
  { label: "Jodhpur Airport, Jodhpur" },
  { label: "Udaipur Maharana Pratap Airport, Udaipur" },
  { label: "Raja Bhoj Airport, Bhopal" },
  { label: "Devi Ahilya Bai Holkar Airport, Indore" },
  { label: "Dr. Babasaheb Ambedkar International Airport, Nagpur" },
  { label: "Jay Prakash Narayan International Airport, Patna" },
  { label: "Birsa Munda Airport, Ranchi" },
  { label: "Biju Patnaik International Airport, Bhubaneswar" },
  { label: "Lokpriya Gopinath Bordoloi International Airport, Guwahati" },
];

export const POPULAR_AIRPORTS = AIRPORTS.filter((a) => a.popular);

export const searchAirports = (q: string): Airport[] => {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return POPULAR_AIRPORTS;
  return AIRPORTS.filter((a) => words.every((w) => a.label.toLowerCase().includes(w))).slice(0, 12);
};
