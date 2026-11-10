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

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

mostLikes([])
mostLikes(blogs)
mostLikes(listWithOneBlog)
