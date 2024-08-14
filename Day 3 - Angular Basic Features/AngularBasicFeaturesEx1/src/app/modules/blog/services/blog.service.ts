import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs: Blog[] = [
    {
      id: 24001,
      title: "RAG Architecture: Advanced RAG",
      description: "Advanced RAG for better LLM generation",
      author: "Andrew Karpathy",
      comments: ["Awesome work Andrew!",
                 "Exceptional!",
                 "Interesting, I'll give it a try.",
                 "Oh wow, never thought about this."
      ]
    },
    {
      id: 24002,
      title: "Cognitive LLM Agents",
      description: "Agents for complex transformations",
      author: "Fei-Fei Li",
      comments: ["This is revolutionary!",
                 "Great work!",
                 "Slowly gravitating to AGI"
      ]
    },
    {
      id: 24003,
      title: "Extrinsic Hallucinations in LLMs",
      description: "Factual content empahasis learning",
      author: "Yann LeCunn",
      comments: ["Just what I was looking for!",
                 "You just saved my thesis!",
                 "Again with these hallucinations"
      ]
    }
  ]

  constructor() { }

  getBlogsArray = () => {
    return this.blogs;
  }

  editBlog = (updatedBlog: any): boolean => {
    if(this.blogs.some(blog => blog.id == updatedBlog.blog_id)) {
      let index: number = this.blogs.findIndex(blog => blog.id == updatedBlog.blog_id);
      const newBlog: Blog = {
        id: updatedBlog.blog_id,
        title: updatedBlog.title,
        description: updatedBlog.description,
        author: updatedBlog.author,
        comments: [updatedBlog.comment1,
                   (updatedBlog.comment2 !== '') ? updatedBlog.comment2 : '',
                   (updatedBlog.comment3 !== '') ? updatedBlog.comment3 : '',
                   (updatedBlog.comment4 !== '') ? updatedBlog.comment4 : '',
                   (updatedBlog.comment5 !== '') ? updatedBlog.comment5 : ''

        ]
      }

      newBlog.comments = newBlog.comments.filter(comment => comment !== '');
      console.log("updated blog: ", newBlog);
      this.blogs[index] = newBlog;

      return true;
    }

    return false;
  }

  deleteBlog = (blogID: number): boolean => {
    if(this.blogs.some(blog => blog.id == blogID)) {
      this.blogs = this.blogs.filter(blog => blog.id != blogID);
      return true;
    }

    return false;
  }
}
