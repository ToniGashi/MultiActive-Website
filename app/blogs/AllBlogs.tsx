import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/ui/common/CustomButton";
import { CustomChip, MainCard } from "@/components/ui/common";
import dayjs from "dayjs";

const blogs = [
  {
    id: 1,
    title: "Why Timeshare Resorts Offer the Wonderful Vacation Experience",
    description:
      "Discover why staying at a timeshare resort offers a truly unique vacation experience. With spacious accommodations, resort-style amenities, and a welcoming community feel, timeshares provide the perfect blend of comfort and value. Enjoy a home away from home without the sales pitch, and create lasting memories with us. Explore more in our blog and start planning your next getaway today!",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/33.png",
    readTime: "3 min",
    createdOn: "2023-08-01T09:33:18.7559479",
    relatedLocation: "",
  },
  {
    id: 2,
    title: "Budget-Friendly Vacation Hacks",
    description:
      "Dreaming of a memorable getaway but worried about the cost? With the right planning and a few clever hacks, you can enjoy a vacation that’s both affordable and amazing. From booking the best deals to choosing cost-effective accommodations like vacation rentals and timeshares, we’ve got you covered. Discover how to save big on your next trip, enjoy free or low-cost activities, dine like a local, and travel light—all while sticking to your budget. Your dream vacation is within reach!",
    isFeatured: true,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/CV_Blog_2.png",
    readTime: "2 min",
    createdOn: "2023-09-13T16:07:13.7644895",
    relatedLocation: "",
  },
  {
    id: 3,
    title:
      "A Guide to Visiting Ocean City, MD: Best Times to Visit and Top Things to Do",
    description:
      "Planning a trip to Ocean City, Maryland? This guide covers everything you need to know for an unforgettable visit. Discover the best times to visit this vibrant coastal town, whether you're looking for sun-soaked beach days or exciting events. Explore top attractions, including the famous boardwalk, water sports, amusement parks, and local dining spots. Whether you're traveling with family, friends, or on a romantic getaway, our guide will help you make the most of your Ocean City adventure. Get ready to experience the charm and excitement of one of the East Coast's premier vacation destinations!",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/3_Ocean_City.png",
    readTime: "2 min",
    createdOn: "2023-10-05T16:04:06.8961756",
    relatedLocation: "Ocean City, MD",
  },
  {
    id: 4,
    title: "Discover the Charm of St. Augustine, FL",
    description:
      "Explore the timeless beauty and rich history of St. Augustine, Florida, the oldest city in the United States. This blog will guide you through the charming streets of this coastal gem, highlighting its historic landmarks, vibrant culture, and unique attractions. From the iconic Castillo de San Marcos to the picturesque cobblestone streets, St. Augustine offers a blend of old-world charm and modern amenities. Whether you're a history buff, a foodie, or simply looking for a relaxing getaway, discover why St. Augustine is a must-visit destination for travelers of all ages.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/19_St_Augustine.png",
    readTime: "3 min",
    createdOn: "2023-12-01T15:45:05.7813076",
    relatedLocation: "St. Augustine Beach, FL",
  },
  {
    id: 5,
    title: "Discover the Magic of Beech Mountain, NC",
    description:
      "Nestled in the stunning Blue Ridge Mountains, Beech Mountain, NC, is a year-round destination brimming with outdoor adventures and scenic beauty. From winter's snowy peaks to summer's lush trails, Beech Mountain offers thrilling ski slopes, peaceful hiking paths, and breathtaking mountain views. Whether you’re into winter sports, nature walks, or local events, Beech Mountain promises an unforgettable experience in every season. Join us as we explore the magic of this high-altitude haven, perfect for nature lovers and adventure seekers alike.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/29.png",
    readTime: "3 min",
    createdOn: "2024-01-27T15:50:29.9411576",
    relatedLocation: "Beech Mountain, NC",
  },
  {
    id: 6,
    title: "Discover the Enchanting Charm of Stowe, Vermont",
    description:
      "Immerse yourself in the picturesque allure of Stowe, Vermont—a charming village renowned for its stunning landscapes and outdoor adventures. From its snow-capped mountains and world-class skiing to its scenic hiking trails and vibrant local culture, Stowe offers a magical escape for nature lovers and adventure seekers alike. Join us as we explore the captivating beauty and unique experiences that make Stowe a must-visit destination throughout the year.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/22.png",
    readTime: "5 min",
    createdOn: "2024-02-16T15:55:45.3044512",
    relatedLocation: "Stowe, VT",
  },
  {
    id: 7,
    title: "Discover the Allure of Siesta Key, Sarasota, FL",
    description:
      "Unveil the magic of Siesta Key, Sarasota’s premier beach destination renowned for its pristine white sand and crystal-clear waters. This tropical paradise offers sun-soaked days, vibrant local culture, and a range of activities from beachcombing and snorkeling to savoring fresh seafood at waterfront eateries. Join us as we explore the enchanting beauty and unique experiences that make Siesta Key a must-visit haven for relaxation and adventure.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/CV_Siesta_Key.png",
    readTime: "2 min",
    createdOn: "2024-03-08T15:58:24.4364003",
    relatedLocation: "Sarasota, FL",
  },
  {
    id: 8,
    title:
      "Experience the Luxury and Tranquility of Longboat Key, Sarasota, FL",
    description:
      "Escape to Longboat Key, a tranquil barrier island in Sarasota, Florida, where luxury meets nature. Renowned for its pristine, secluded beaches and upscale lifestyle, Longboat Key is the perfect destination for those seeking a peaceful yet indulgent retreat.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/42.png",
    readTime: "2 min",
    createdOn: "2024-04-12T15:58:24.4364003",
    relatedLocation: "Longboat Key, FL",
  },
  {
    id: 9,
    title:
      "Ultimate Guide to Vacationing with Kids: Tips for a Fun and Stress-Free Family Trip",
    description:
      "Traveling with kids doesn’t have to be stressful—it can be an adventure filled with fun, laughter, and unforgettable moments! Our Ultimate Guide to Vacationing with Kids is packed with expert tips to help you plan a smooth, stress-free trip that everyone will enjoy. From involving your little ones in the planning process to choosing spacious vacation rentals and timeshares, we've got you covered. Discover how to keep meals simple, stick to routines, and find kid-friendly activities that make the most of your family getaway. Start planning today and create memories that will last a lifetime!",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/55.png",
    readTime: "8 min",
    createdOn: "2024-05-24T16:07:13.7644895",
    relatedLocation: "",
  },
  {
    id: 10,
    title: "Why Islamorada and Marathon Key Should Be Your Next Vacation Spot",
    description:
      "Explore the allure of Islamorada and Marathon Key in the Florida Keys. From world-class fishing and stunning water activities to unique attractions and beautiful beaches, these destinations offer a perfect blend of adventure, relaxation, and natural beauty. Discover why these island gems should be your next vacation spot.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/15.png",
    readTime: "3 min",
    createdOn: "2024-06-15T17:06:49.2261025",
    relatedLocation: "Marathon, FL",
  },
  {
    id: 11,
    title: "Catch the Wave: Tips for Successful Boogie Boarding",
    description:
      "Catch the wave with our ultimate guide to boogie boarding! Whether you're a beginner or looking to enhance your skills, these essential tips will help you choose the right board, gear up, and ride the perfect wave with confidence. Dive into the fun and make the most of your time in the sun with our expert advice on mastering this thrilling water sport!",
    isFeatured: true,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/39_boogie_board.png",
    readTime: "7 min",
    createdOn: "2024-06-29T21:30:00.5099402",
    relatedLocation: "",
  },
  {
    id: 12,
    title: "How to Build the Ultimate Sandcastle: Tips and Tricks",
    description:
      "Unleash your creativity at the beach with our guide to building the ultimate sandcastle! From choosing the perfect spot to mastering the drip method and adding intricate details, these tips and tricks will help you craft a sandcastle that’s sure to impress. Grab your tools and get ready for some fun in the sun as you create a masterpiece in the sand!",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/45.png",
    readTime: "6 min",
    createdOn: "2024-08-20T15:12:22.4551349",
    relatedLocation: "",
  },
  {
    id: 13,
    title: "Discover the Magic of Virginia Beach: Top Reasons to Visit",
    description:
      "Uncover the allure of Virginia Beach, a coastal gem that offers the perfect blend of natural beauty, thrilling outdoor activities, rich history, and vibrant culture. From sun-kissed beaches and water sports to family-friendly attractions and a lively nightlife, this destination has something for everyone. Explore why Virginia Beach should be at the top of your travel list.",
    isFeatured: false,
    thumbnailImageUrl:
      "https://azureblobimg.blob.core.windows.net/coolvacay/7.png",
    readTime: "6 min",
    createdOn: "2024-08-29T01:04:43.9934264",
    relatedLocation: "Virginia Beach, VA",
  },
];

async function AllBlogs() {
  const featuredBlog = blogs.find((blog) => blog.isFeatured);
  return (
    <div className="flex mt-10 w-full max-w-[1220px] flex-col items-center justify-center">
      {featuredBlog && (
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-20">
          <div className="flex max-w-full flex-col gap-5 md:max-w-[50%]">
            <CustomChip label="Featured" width={80} />
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-medium leading-tight md:text-[50px] md:leading-[67px]">
                {featuredBlog?.title}
              </h2>
              <p className="mb-2 text-sm leading-[22px] text-gray-600 md:text-base md:leading-[30px]">
                {featuredBlog?.description}
              </p>
              <Link href={`/blog/${featuredBlog.id}`}>
                <CustomButton label="Read more" width={160} />
              </Link>
            </div>
          </div>
          <div className="flex w-full md:w-auto">
            <Image
              alt="Blog image"
              src={featuredBlog?.thumbnailImageUrl}
              className="hidden rounded-2xl object-cover md:inline-block md:h-auto md:w-auto"
              width={530}
              height={370}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      )}
      <div className="mt-10 grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {blogs
          .filter((blog) => blog.id !== featuredBlog?.id)
          .map((card) => {
            return (
              <Link key={card.id} href={`/blog/${card.id}`} className="h-full">
                <MainCard
                  imageUrl={card.thumbnailImageUrl}
                  name={card.title}
                  subtitle={`${dayjs(card.createdOn).format(
                    "MMMM DD, YYYY"
                  )}  •  ${card.readTime} min`}
                  key={card.id}
                  isBlogCard={true}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default AllBlogs;
