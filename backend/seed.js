require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const products = [
  {
    name: "Velvet Rose Eau de Parfum",
    slug: "velvet-rose",
    description: "A sensual rose-forward fragrance with warm amber notes.",
    images: [
      "https://plus.unsplash.com/premium_photo-1752348824879-f7320fe3c0f1?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1649702727591-2430d9ad8532?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 4599,
    sizes: [
      { size: "30ml", price: 2999 },
      { size: "50ml", price: 4599 },
      { size: "100ml", price: 6999 },
    ],
    category: "Floral",
  },
  {
    name: "Citrus Whisper",
    slug: "citrus-whisper",
    description: "Bright citrus and green notes, perfect for daytime wear.",
    images: [
      "https://images.unsplash.com/photo-1623085080484-623ff2873922?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1546333603-2895edefc462?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 3499,
    sizes: [
      { size: "30ml", price: 2199 },
      { size: "50ml", price: 3499 },
    ],
    category: "Citrus",
  },
  {
    name: "Midnight Oud",
    slug: "midnight-oud",
    description: "A deep and mysterious oud blend with smoky undertones.",
    images: [
      "https://images.unsplash.com/photo-1676924873855-a77e7fe40791?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1637645367952-687dca50d655?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 6299,
    sizes: [
      { size: "50ml", price: 6299 },
      { size: "100ml", price: 9499 },
    ],
    category: "Woody",
  },
  {
    name: "Ocean Mist",
    slug: "ocean-mist",
    description: "A breezy marine fragrance that captures the essence of the sea.",
    images: [
      "https://plus.unsplash.com/premium_photo-1739831741790-fd6092ce58d5?w=600&auto=format&fit=crop&q=60",
      "https://plus.unsplash.com/premium_photo-1752485892414-6656876bf49b?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 4199,
    sizes: [
      { size: "30ml", price: 2899 },
      { size: "50ml", price: 4199 },
      { size: "100ml", price: 6499 },
    ],
    category: "Fresh",
  },
  {
    name: "Amber Noir",
    slug: "amber-noir",
    description: "Warm amber and vanilla blend with a hint of spice.",
    images: [
      "https://plus.unsplash.com/premium_photo-1757614255517-a73613e4d6a6?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 5499,
    sizes: [
      { size: "50ml", price: 5499 },
      { size: "100ml", price: 8699 },
    ],
    category: "Oriental",
  },
  {
    name: "Lavender Bloom",
    slug: "lavender-bloom",
    description: "Calming lavender fragrance with a touch of white musk.",
    images: [
      "https://images.unsplash.com/photo-1637864548404-d2a95c37fc73?w=600&auto=format&fit=crop&q=60",
      "https://th.bing.com/th/id/OIP.hhag-k4xo1QfW8GJJ6njHQHaE7?w=306&h=204",
    ],
    basePrice: 3399,
    sizes: [
      { size: "30ml", price: 1999 },
      { size: "50ml", price: 3399 },
    ],
    category: "Aromatic",
  },
  {
    name: "Golden Sand",
    slug: "golden-sand",
    description: "A sun-kissed blend of amber, coconut, and jasmine.",
    images: [
      "https://images.unsplash.com/photo-1733660227083-12b78ad0073d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1636730520710-a8e432ab3617?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&auto=format&fit=crop&q=60"
    ],
    basePrice: 5899,
    sizes: [
      { size: "50ml", price: 5899 },
      { size: "100ml", price: 8999 },
    ],
    category: "Oriental",
  },
  {
    name: "Jasmine Dream",
    slug: "jasmine-dream",
    description: "A floral explosion of jasmine and white florals.",
    images: [
      "https://plus.unsplash.com/premium_photo-1752485892414-6656876bf49b?w=600&auto=format&fit=crop&q=60",
      "https://plus.unsplash.com/premium_photo-1675812488919-21fc8fae565b?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 4199,
    sizes: [
      { size: "30ml", price: 2499 },
      { size: "50ml", price: 4199 },
    ],
    category: "Floral",
  },
  {
    name: "Woody Essence",
    slug: "woody-essence",
    description: "Earthy and woody notes with a touch of vetiver.",
    images: [
      "https://images.unsplash.com/photo-1725139695447-f75e1b482708?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1748480852876-47b508a0902d?w=600&auto=format&fit=crop&q=60",
    ],
    basePrice: 4899,
    sizes: [
      { size: "50ml", price: 4899 },
      { size: "100ml", price: 7499 },
    ],
    category: "Woody",
  },
  {
    name: "Peony Blush",
    slug: "peony-blush",
    description: "A romantic bouquet of peony, red apple, and rose.",
    images: [
      "https://images.unsplash.com/photo-1613521140785-e85e427f8002?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1678984633768-c4fd5a01732a?w=600&auto=format&fit=crop&q=60",
      "https://plus.unsplash.com/premium_photo-1667662655276-b3751fbbe107?w=600&auto=format&fit=crop&q=60"
    ],
    basePrice: 4399,
    sizes: [
      { size: "30ml", price: 2799 },
      { size: "50ml", price: 4399 },
      { size: "100ml", price: 6699 },
    ],
    category: "Floral",
  },

  {
    name: "Spiced Leather",
    slug: "spiced-leather",
    description: "Rich leather and warm spices create a bold, masculine scent.",
    images: [
      "https://images.unsplash.com/photo-1737424065216-bc51dd626175?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3BpY2VkJTIwTGVhdGhlciUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1731972206678-3376c8240198?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3BpY2VkJTIwTGVhdGhlciUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    ],
    basePrice: 5699,
    sizes: [
      { size: "50ml", price: 5699 },
      { size: "100ml", price: 8799 },
    ],
    category: "Leather",
  },

  {
    name: "Vanilla Sky",
    slug: "vanilla-sky",
    description: "Sweet vanilla blended with creamy sandalwood and soft musk.",
    images: [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmFuaWxsYSUyMFNreSUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1630573133526-8d090e0269af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VmFuaWxsYSUyMFNreSUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    ],
    basePrice: 3899,
    sizes: [
      { size: "30ml", price: 2499 },
      { size: "50ml", price: 3899 },
      { size: "100ml", price: 6199 },
    ],
    category: "Gourmand",
  },
];

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Successfully seeded 12 products");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error seeding data:", err);
  });
