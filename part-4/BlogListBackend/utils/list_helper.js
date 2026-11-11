export const dummy = blogs => {
  return 1
}

export const totalLikes = blogs => {
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0)
}

export const favoriteBlog = blogs => {
  if (blogs.length === 0) return null
  return blogs.reduce(
    (favBlog, currentBlog) =>
      currentBlog.likes > favBlog.likes ? currentBlog : favBlog,
    { likes: 0 },
  )
}

export const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const blogsByAuthors = {}

  for (const blog of blogs) {
    const author = blog.author
    blogsByAuthors[author] = (blogsByAuthors[author] ?? 0) + 1
  }
  const mostAuthorBlogs = Object.entries(blogsByAuthors)
    .map(([author, blogs]) => ({ author, blogs }))
    .reduce(
      (mostAuthorBlogs, currentAuthor) =>
        currentAuthor.blogs > mostAuthorBlogs.blogs
          ? currentAuthor
          : mostAuthorBlogs,
      { blogs: 0 },
    )
  return mostAuthorBlogs
}

export const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  }
  const authorLikesCount = {}

  for (const blog of blogs) {
    const author = blog.author
    const likes = blog.likes
    authorLikesCount[author] = (authorLikesCount[author] ?? 0) + likes
  }
  const mostAuthorLikes = Object.entries(authorLikesCount)
    .map(([author, likes]) => ({ author, likes }))
    .reduce(
      (mostAuthorLikes, currentAuthor) =>
        currentAuthor.likes > mostAuthorLikes.likes
          ? currentAuthor
          : mostAuthorLikes,
      { likes: 0 },
    )
  return mostAuthorLikes
}
