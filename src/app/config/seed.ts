import Product from "../modules/product/product.model";

export const seedProducts = async () => {
  const products = [
    {
      name: "Volt Jump X2",
      brand: "E-Wheelz",
      price: 130000,
      category: "Electric",
      frameMaterial: "Titanium",
      quantity: 35,
      images: [
        "https://res.cloudinary.com/doc50jlhc/image/upload/v1746286533/ylemf2vyqbgw5lznvths.png",
        "https://res.cloudinary.com/doc50jlhc/image/upload/v1746283323/z15fiv6bbdt8f7eisi8k.jpg",
      ],
      specifications: [
        { key: "Battery", value: "36V 10Ah" },
        { key: "Motor", value: "350W Brushless" },
        { key: "Range", value: "40 km" },
      ],
    },
    {
      name: "SpeedRider 3000",
      brand: "RidePro",
      price: 85000,
      category: "Road",
      frameMaterial: "Aluminum",
      quantity: 20,
      images: ["https://i.ibb.co/NCFpb9X/pexels-fotios-photos-1092644.jpg"],
      specifications: [
        { key: "Weight", value: "11 kg" },
        { key: "Brakes", value: "Disc Brakes" },
      ],
    },
    {
      name: "TrailBlazer Pro",
      brand: "MountainMaster",
      price: 112000,
      category: "Mountain",
      frameMaterial: "Carbon Fiber",
      quantity: 15,
      images: [
        "https://i.ibb.co/nsCw3fn/pexels-gabriel-freytez-110599-341523.jpg",
      ],
      specifications: [
        { key: "Suspension", value: "Full Suspension" },
        { key: "Tire Size", value: "27.5 inch" },
      ],
    },
    {
      name: "EcoCruze E-Bike",
      brand: "EcoMotion",
      price: 99000,
      category: "Electric",
      frameMaterial: "Steel",
      quantity: 25,
      images: [
        "https://i.ibb.co/f97ZYNj/pexels-kiara-coll-1519602-2928381.jpg",
      ],
      specifications: [
        { key: "Battery", value: "48V 12Ah" },
        { key: "Charging Time", value: "6 hours" },
      ],
    },
    {
      name: "UrbanFlow Hybrid",
      brand: "CityCruze",
      price: 78000,
      category: "Hybrid",
      frameMaterial: "Aluminum",
      quantity: 30,
      images: ["https://i.ibb.co/Np1M1bQ/pexels-lastly-699122.jpg"],
      specifications: [
        { key: "Gear System", value: "21-speed" },
        { key: "Usage", value: "City + Trail" },
      ],
    },
    {
      name: "X-Treme BMX",
      brand: "TrickMaster",
      price: 60000,
      category: "BMX",
      frameMaterial: "Chromoly Steel",
      quantity: 18,
      images: ["https://i.ibb.co/TBngDBz/pexels-madebymath-90946.jpg"],
      specifications: [
        { key: "Pegs", value: "Front and Rear" },
        { key: "Frame", value: "Reinforced" },
      ],
    },
  ];
  try {
    const operations = products.map((product) => ({
      updateOne: {
        filter: { name: product.name }, // Use a unique field to identify duplicates (e.g., name)
        update: { $set: product },
        upsert: true, // Insert the product if it doesn't exist
      },
    }));

    const result = await Product.bulkWrite(operations);
    console.log("Products seeded successfully!!", result);
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
