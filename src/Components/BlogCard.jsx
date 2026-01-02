const BlogCard = ({ blog }) => {
  const { title, shortDescription, category, author, readTime, publishedDate } =
    blog;

  return (
    <div
      className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-duration="500"
    >
      {/* Image */}
      <img
        src="https://i.ibb.co.com/LXLPbVX6/premium-photo-1694475490571-e76a4d027c02.avif"
        alt={title}
        className="w-full h-48 object-cover cursor-pointer transition-all hover:scale-105"
      />

      {/* Content */}
      <div className="p-5">
        <span className="text-sm text-blue-600 font-semibold">{category}</span>

        <h2 className="text-xl font-bold mt-2 mb-2 line-clamp-2">{title}</h2>

        <p className="text-base-content text-sm mb-4 line-clamp-3">
          {shortDescription}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt={author.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{author.name}</span>
          </div>
          <div className="text-right">
            <p>{readTime}</p>
            <p>{publishedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
